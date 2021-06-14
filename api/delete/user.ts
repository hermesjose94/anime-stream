import { GraphQLClient } from 'graphql-request';
import { DELETE_USER } from 'gql/mutations';
import { DeletedUserType } from 'interfaces';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);
export const deletedUser = async (user: DeletedUserType): Promise<string> => {
	const data = await client.request(
		DELETE_USER,
		{
			id: user.id,
		},
		{
			'content-type': 'application/json',
			Authorization: `Bearer ${user.token}`,
		}
	);
	return data.delete_users.returning[0].id;
};
