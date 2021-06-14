import { UserSignUpType } from 'interfaces';

export const registerUser = async (user: UserSignUpType) => {
	const data = await fetch(`/api/register-user`, {
		method: 'POST',
		body: JSON.stringify(user),
	});
	return data;
};
