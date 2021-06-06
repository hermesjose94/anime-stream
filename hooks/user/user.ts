import { useSession } from 'next-auth/client';
import { UserType } from 'interfaces';
import { useQuery } from 'react-query';
import { GET_USER, getUser } from 'api';
import React from 'react';

export const useUser = () => {
	const [session] = useSession();
	// const user = session?.user ? (session.user as UserType) : undefined;
	const token = session?.token ? (session?.token as string) : '';
	const { data: userData, isLoading } = useQuery<UserType>(GET_USER, () =>
		getUser(token)
	);
	return {
		user: userData,
		token,
		isLoading,
	};
};
