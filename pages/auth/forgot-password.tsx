import * as React from 'react';
import { Layout } from 'components/layout';
import { Typography } from 'components/common/typography';
import { FirstForm, SecondForm } from 'components/auth/forgot-password';
import { useRouter } from 'next/router';
import { BottomSheet } from 'components/common/bottom-sheet';
import { VerificationCode } from 'components/verification-code';
import { Logo } from 'components/logo';
import { useToasts } from 'react-toast-notifications';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const ForgotPassword = () => {
	const [userId, setUserId] = React.useState('');
	const [token, setToken] = React.useState('');
	const [
		isVerificationCodeVisible,
		setIsVerificationCodeVisible,
	] = React.useState(false);

	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSecondStep, setIsSecondStep] = React.useState(false);
	const { addToast } = useToasts();

	const onSubmitFirstForm = async (user: string) => {
		// setEmail(email);
		setIsLoading(true);
		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_API
			}/users/recoveryPassword?${new URLSearchParams({ user })}`
		);
		const json = await res.json();
		console.log(json);
		if (json.data?.id) {
			setIsVerificationCodeVisible(true);
			setUserId(String(json.data.id));
		} else {
			addToast(json.message, { appearance: 'error' });
		}
		setIsLoading(false);
	};

	const onSubmitVerificationCode = async (pin: string) => {
		setIsLoading(true);
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/users/pin/validate`,
			{
				method: 'POST',
				body: JSON.stringify({
					pin,
					userId,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);
		const json = await res.json();
		if (json.data?.user && json.data?.access_token) {
			setIsVerificationCodeVisible(false);
			setToken(json.data.access_token);
			setIsSecondStep(true);
		} else {
			addToast(json.message, { appearance: 'error' });
		}
		setIsLoading(false);
	};

	const onSubmitSecondForm = async (data: any) => {
		setIsLoading(true);
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/users/changePassword`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const json = await res.json();
		if (json.data) {
			setIsLoading(false);
			addToast('Congrats! you changed your password', {
				appearance: 'success',
			});
			router.push('/auth/signin');
		} else {
			addToast(json.message, { appearance: 'error' });
		}
		setIsLoading(false);
	};

	const titleText = React.useMemo(() => {
		return isSecondStep ? 'Recover your account' : 'Find your account';
	}, [isSecondStep]);

	const smallTitleTextOne = React.useMemo(() => {
		return isSecondStep
			? 'Enter the new password'
			: 'Enter your username or the email';
	}, [isSecondStep]);

	const smallTitleTextTwo = React.useMemo(() => {
		return isSecondStep
			? 'so you can access your account'
			: 'liked to your account';
	}, [isSecondStep]);

	return (
		<Layout>
			<div className="center flex flex-col items-center justify-center px-9 py-6 w-full">
				<Logo className="mb-4" />
				<Typography type="title" className="mb-4">
					{titleText}
				</Typography>
				<Typography type="smallTitle" className="text-center">
					{smallTitleTextOne}
				</Typography>
				<Typography type="smallTitle" className="text-center">
					{smallTitleTextTwo}
				</Typography>
				{!isSecondStep ? (
					<FirstForm onHandleSubmit={onSubmitFirstForm} isLoading={isLoading} />
				) : (
					<SecondForm
						onHandleSubmit={onSubmitSecondForm}
						isLoading={isLoading}
					/>
				)}
				{isVerificationCodeVisible && (
					<BottomSheet>
						<VerificationCode
							resendCode={() => console.log('resenging code')}
							onSubmit={onSubmitVerificationCode}
							isLoading={isLoading}
						/>
					</BottomSheet>
				)}
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (session && session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};

export default ForgotPassword;
