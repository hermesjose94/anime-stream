import { GraphQLClient } from 'graphql-request';
import { UserType } from 'interfaces';
import { GET_USER, GET_USERS } from 'gql/queries';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export const getUser = async (
	token: string,
	id: string
	// variables: any | undefined
): Promise<UserType> => {
	const user = await client.request(
		GET_USER,
		{ id: id },
		{
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		}
	);

	return user.users[0];
};

export const getUsers = async (
	token: string = '',
	limit: number,
	offset: number,
	role?: string | undefined
	// variables: any | undefined
): Promise<{ users: UserType[]; total: number }> => {
	const query = GET_USERS(role);
	const varibles = role
		? { limit: limit, offset: offset, role: role }
		: { limit: limit, offset: offset };

	const data = await client.request(query, varibles, {
		'content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	});
	const users = data.users;
	const total = data.users_aggregate.aggregate.count;

	return { users, total };
};
