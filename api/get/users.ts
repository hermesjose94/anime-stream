import { GraphQLClient } from 'graphql-request';
import { UserType } from 'interfaces';
import { GET_USERS } from 'gql/queries';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export const getUsers = async (
	token: string
	// variables: any | undefined
): Promise<UserType[]> => {
	const user = await client.request(GET_USERS, undefined, {
		'content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	});

	return user.users;
};
