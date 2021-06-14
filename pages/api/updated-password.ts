import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { UPDATED_PASSWORD } from '../../gql/mutations';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { id, password } = JSON.parse(req.body);
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
			const updatedPasswordResopnse = await client.request(UPDATED_PASSWORD, {
				id,
				password: hashedPassword,
			});
			res.statusCode = 200;
			res.json({ updatedPasswordResopnse });
		} catch (error) {
			console.log('error', error);
			res.statusCode = 200;
			res.json({ ...error, error: 'password not changed' });
		}
	}
};
