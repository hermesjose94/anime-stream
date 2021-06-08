import { useSession } from 'next-auth/client';
import { UserType } from 'interfaces';
import { useQuery } from 'react-query';
import { GET_USER, getUser } from 'api';

export const useUser = () => {
	const [session] = useSession();
	const user = session?.user ? (session.user as UserType) : undefined;
	const token = session?.token ? (session?.token as string) : '';
	if (user) {
		const { data: userData, isLoading, isError } = useQuery<UserType>(
			GET_USER,
			() => getUser(token, user?.id || '')
		);
		return {
			user: userData,
			token,
			isLoading,
			isError,
		};
	}
	return {
		user: undefined,
		token: undefined,
		isLoading: false,
		isError: false,
	};
};
