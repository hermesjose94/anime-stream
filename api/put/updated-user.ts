import { GraphQLClient } from 'graphql-request';
import { UPDATED_USER } from 'gql/mutations';
import { UpdatedUserType, UserType } from 'interfaces';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export const updatedUser = async (user: UpdatedUserType): Promise<UserType> => {
	const data = await client.request(
		UPDATED_USER,
		{
			id: user.id,
			email: user.email,
			fullname: user.fullname,
			username: user.username,
		},
		{
			'content-type': 'application/json',
			Authorization: `Bearer ${user.token}`,
		}
	);
	console.log({ data });

	return data.update_users.returning[0];
};
