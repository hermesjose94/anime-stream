import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { CREATE_USER } from '../../gql/mutations';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { username, email, password, fullname } = JSON.parse(req.body);
		const id = uuidv4().toString();
		const hasuraSecret = process.env.HASURA_SECRET as string;
		const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const client = new GraphQLClient(apiURL, {
			headers: {
				'content-type': 'application/json',
				'x-hasura-admin-secret': hasuraSecret,
			},
		});
		try {
			const createdUserResopnse = await client.request(CREATE_USER, {
				id,
				email,
				username,
				fullname,
				password: hashedPassword,
			});
			res.statusCode = 200;
			res.json({ createdUserResopnse });
		} catch (error) {
			console.log('error', error);
			res.statusCode = 200;
			res.json({ ...error, error: 'User or email already existing' });
		}
	}
};
