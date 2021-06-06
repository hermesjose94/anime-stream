import { GraphQLClient } from 'graphql-request';
import { UserType } from 'interfaces';
import { GET_USER } from 'gql/queries';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export const getUser = async (
	token: string
	// variables: any | undefined
): Promise<UserType> => {
	const user = await client.request(GET_USER, undefined, {
		'content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	});

	return user.users[0];
};
