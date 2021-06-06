import { GraphQLClient } from 'graphql-request';
import { SesionType } from 'interfaces';

interface Auth {
	token?: string;
}

export const authFetcher = <T>(url: string, session?: SesionType): Promise<T> =>
	fetcher<T>(url, { token: session?.token });

export const fetcher = <T>(
	url: string,
	auth?: Auth,
	options?: RequestInit
): Promise<T> => {
	return fetch(url, {
		...options,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${auth?.token || ''}`,
		},
	})
		.then((res) => res.json())
		.then((json) => json.data);
};

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export const fetcherGraph2 = async <T>(query: string): Promise<T> => {
	return client.request<T>(query);
};

export const fetcherGraph = async <T, R>(
	query: string,
	token: string | undefined,
	variables: R | undefined
): Promise<T> => {
	if (token) {
		return client.request<T, R>(query, variables, {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		});
	} else {
		return client.request<T, R>(query, variables, {
			'content-type': 'application/json',
		});
	}
};
