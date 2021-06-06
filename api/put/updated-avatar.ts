import { GraphQLClient } from 'graphql-request';
import { UPDATED_AVATAR_USER } from 'gql/mutations';
import { UpdatedAvatarType, UserType } from 'interfaces';

const apiURL = process.env.NEXT_PUBLIC_HASURA_API as string;
const client = new GraphQLClient(apiURL);

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
