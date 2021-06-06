import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { GraphQLClient } from 'graphql-request';
import { CREATE_USER_SOCIAL } from '../../../gql/mutations';
import { GET_USER_LOGIN } from '../../../gql/queries';
import { UserType } from 'interfaces';
const hasura_secret = process.env.HASURA_SECRET as string;
const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			profile: (data) => ({
				id: '',
				provider: 'google',
				...data,
			}),
		}),
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				username: { label: 'username', type: 'text' },
				password: { label: 'password', type: 'text' },
			},
			authorize: async (credentials: {
				username: string;
				password: string;
			}) => {
				try {
					const response = await client.request(
						GET_USER_LOGIN,
						{ username: credentials.username },
						{
							'content-type': 'application/json',
							'x-hasura-admin-secret': hasura_secret,
						}
					);
					const user = response.users;
					if (!!user.length) {
						const secretValid = await bcrypt.compare(
							credentials.password,
							user[0].password
						);
						if (secretValid) {
							const finalUser = {
								id: user[0].id,
								email: user[0].email,
								username: user[0].username,
								avatar: user[0].avatar,
								fullname: user[0].fullname,
								role: user[0].role,
							};
							return finalUser;
						}
					}
					return Promise.resolve(null);
				} catch (error) {
					console.log('---ERROR CREDENTIALS---', error);
					return Promise.resolve(error);
				}
			},
		}),
	],
	secret: process.env.JWT_SECRET,

	session: {
		jwt: true,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		encode: async (params: JWTEncodeParams | undefined) => {
			const token = params?.token;
			const secret = String(params?.secret);
			const user = (token?.user as unknown) as UserType;
			const jwtClaims = {
				user: user,
				iat: Date.now() / 1000,
				exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
				'https://hasura.io/jwt/claims': {
					'x-hasura-allowed-roles': ['user', 'anonymous', 'admin'],
					'x-hasura-default-role': user && user.role,
					'x-hasura-user-id': user && user.id,
				},
			};
			const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256' });
			return encodedToken;
		},

		decode: async (params: JWTDecodeParams | undefined) => {
			const token = params?.token;
			const secret = String(params?.secret);
			const decodedToken = jwt.verify(String(token), secret, {
				algorithms: ['HS256'],
			});
			return decodedToken as JWT;
		},
	},
	pages: {},
	callbacks: {
		async session(session, token) {
			const encodedToken = jwt.sign(token, process.env.JWT_SECRET as string, {
				algorithm: 'HS256',
			});
			session.user = token.user as JWT;
			session.token = encodedToken;
			return session;
		},
		async jwt(token, user) {
			const isUserSignedIn = user ? true : false;
			if (isUserSignedIn) {
				if (user?.provider) {
					const variables = {
						id: String(user?.id).toString(),
						email: user?.email,
						username: `user${user?.id}`,
						avatar: user?.picture,
						fullname: user?.name,
						providerId: String(user?.id).toString(),
						socialName: user?.provider,
					};
					try {
						const response = await client.request(
							CREATE_USER_SOCIAL,
							variables,
							{
								'content-type': 'application/json',
								'x-hasura-admin-secret': hasura_secret,
							}
						);
						token.user = response.insert_users_one;
					} catch (error) {
						console.log('---ERROR JWT---', error);
					}
				} else {
					token.user = user;
				}
			}
			return token;
		},
	},
	events: {},
	debug: true,
});
