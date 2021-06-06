import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { CREATE_USER } from '../../gql/mutations';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// if (!(await bcrypt.compare(password, user.password))) {
// 	return cb(boom.unauthorized(), false);
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { email, password } = JSON.parse(req.body);
		const hasuraSecret = process.env.HASURA_SECRET as string;
		const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
		const hashedPassword = await bcrypt.hash(password, 10);

		const client = new GraphQLClient(apiURL, {
			headers: {
				'content-type': 'application/json',
				'x-hasura-admin-secret': hasuraSecret,
			},
		});
		try {
			const createdUserResopnse = await client.request(CREATE_USER, {
				email,
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
