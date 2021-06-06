import { gql } from 'graphql-request';

export interface CreateUserVariables {
	id: string;
	fullname: string;
	username: string;
	email: string;
	password?: string;
	avatar: string;
	providerId?: string;
	socialName?: string;
}

export const CREATE_USER_SOCIAL = gql`
	mutation CREATE_USER_SOCIAL(
		$id: String
		$fullname: String
		$username: String
		$email: String
		$avatar: String
		$providerId: String
		$socialName: String
	) {
		insert_users_one(
			object: {
				id: $id
				email: $email
				username: $username
				avatar: $avatar
				fullname: $fullname
				providerId: $providerId
				socialName: $socialName
			}
			on_conflict: {
				constraint: users_email_key
				update_columns: email
				where: {}
			}
		) {
			id
			email
			username
			fullname
			avatar
			role
		}
	}
`;

export const CREATE_USER = gql`
	mutation CREATE_USER(
		$id: String
		$email: String
		$username: String
		$fullname: String
		$password: String
	) {
		insert_users(
			objects: {
				id: $id
				email: $email
				username: $username
				fullname: $fullname
				password: $password
				socialName: "credentials"
			}
		) {
			returning {
				id
			}
		}
	}
`;

export const UPDATED_AVATAR_USER = gql`
	mutation UPDATED_AVATAR_USER(
		$id: String
		$avatar: String
		$avatar_id: String
	) {
		update_users(
			where: { id: { _eq: $id } }
			_set: { avatar: $avatar, avatar_id: $avatar_id }
		) {
			returning {
				id
				email
				fullname
				username
				role
				avatar
				avatar_id
			}
		}
	}
`;

export const UPDATED_USER = gql`
	mutation UPDATED_USER(
		$id: String
		$username: String
		$email: String
		$fullname: String
	) {
		update_users(
			where: { id: { _eq: $id } }
			_set: { email: $email, fullname: $fullname, username: $username }
		) {
			returning {
				id
				email
				fullname
				username
				role
				avatar
				avatar_id
			}
		}
	}
`;
