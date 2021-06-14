import { GraphQLClient } from 'graphql-request';
import { UPDATED_USER, UPDATED_ROLE, UPDATED_AVATAR_USER } from 'gql/mutations';
import {
	UpdatedUserType,
	UpdatedPasswordType,
	UpdatedRoleType,
	UpdatedAvatarType,
	UserType,
} from 'interfaces';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

export const updatedPassword = async (user: UpdatedPasswordType) => {
	const data = await fetch(`/api/updated-password`, {
		method: 'POST',
		body: JSON.stringify(user),
	});
	return data;
};

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
	return data.update_users.returning[0];
};

export const updatedRole = async (user: UpdatedRoleType): Promise<UserType> => {
	const data = await client.request(
		UPDATED_ROLE,
		{
			id: user.id,
			role: user.role,
		},
		{
			'content-type': 'application/json',
			Authorization: `Bearer ${user.token}`,
		}
	);
	return data.update_users.returning[0];
};

export const updatedAvatar = async (
	user: UpdatedAvatarType
): Promise<UserType> => {
	const data = await client.request(
		UPDATED_AVATAR_USER,
		{ id: user.id, avatar: user.avatar, avatar_id: user.avatar_id },
		{
			'content-type': 'application/json',
			Authorization: `Bearer ${user.token}`,
		}
	);

	if (user.public_id_delete) {
		await fetch(`/api/delete-file`, {
			method: 'POST',
			body: JSON.stringify({ public_id: user.public_id_delete }),
		});
	}
	return data.update_users.returning[0];
};
