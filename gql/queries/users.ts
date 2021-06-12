import { gql } from 'graphql-request';

export const GET_USER_LOGIN = gql`
	query GET_USER_LOGIN($username: String) {
		users(where: { username: { _eq: $username } }) {
			id
			email
			fullname
			username
			role
			avatar
			avatar_id
			password
		}
	}
`;

export const GET_USER = gql`
	query GET_USER($id: String) {
		users(where: { id: { _eq: $id } }) {
			id
			email
			fullname
			username
			role
			avatar
			avatar_id
		}
	}
`;

export const GET_USERS = (role?: string) => {
	if (role) {
		return gql`
			query GET_USERS($limit: Int, $offset: Int, $role: String!) {
				users_aggregate(where: { role: { _eq: $role } }) {
					aggregate {
						count
					}
				}
				users(
					limit: $limit
					offset: $offset
					order_by: { fullname: asc }
					where: { role: { _eq: $role } }
				) {
					id
					email
					fullname
					username
					role
					avatar
					avatar_id
				}
			}
		`;
	} else {
		return gql`
			query GET_USERS($limit: Int, $offset: Int) {
				users_aggregate {
					aggregate {
						count
					}
				}
				users(limit: $limit, offset: $offset, order_by: { fullname: asc }) {
					id
					email
					fullname
					username
					role
					avatar
					avatar_id
				}
			}
		`;
	}
};
