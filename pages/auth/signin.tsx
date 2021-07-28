import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Icons, Images } from 'interfaces';
import { Typography } from 'components/common/typography';
import { Button } from 'components/common/button/button';
import { Separator } from 'components/common/separator';
import { InputText } from 'components/common/form/input-text';
import { InputPassword } from 'components/common/form/input-password';
import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { GetServerSideProps } from 'next';
import { LayoutAuth } from 'components/layout';
import { Logo } from 'components/logo';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
	} = useForm({ mode: 'onChange' });
	const router = useRouter();
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const rules = {
		username: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
	};

	const onSubmitForm = async (data: any) => {
		setIsLoading(true);
		try {
			const response = await signIn('credentials', {
				redirect: false,
				username: data.username,
				password: data.password,
				callbackUrl: '/',
			});
			if (response?.error) {
				setIsLoading(false);
				addToast('user or password invalid', { appearance: 'error' });
			} else {
				setIsLoading(false);
				router.push('/');
			}
		} catch (error) {
			addToast(error, { appearance: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitDataGoogle = async () => {
		setIsLoading(true);
		try {
			signIn('google', {
				redirect: true,
				callbackUrl: '/',
			});
		} catch (error) {
			addToast('Google error', { appearance: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<LayoutAuth Image={Images.login}>
			{/* <Typography type="title">Anime</Typography> */}
			<div className="w-full flex justify-center items-center">
				<Logo />
			</div>
			<Typography type="text-base" className="text-center mt-2">
				Welcome back!
			</Typography>
			<Button
				className="mt-4"
				label="Sign in with Google"
				social={'google'}
				size="full"
				icon={Icons.google}
				onClick={handleSubmitDataGoogle}
			/>
			<Separator />
			<form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
				<InputText
					name="username"
					title="Username"
					register={register}
					rules={rules.username}
					error={errors.username}
				/>
				<InputPassword
					name="password"
					title="Password"
					validate={false}
					register={register}
					rules={rules.password}
					error={errors.password}
				/>
				<div className="w-full items-end flex">
					<Typography type="link" className="text-right text-xs w-full">
						Forgot password?
					</Typography>
				</div>
				<Button
					className="mt-3"
					label={isLoading ? 'Loading' : 'Login'}
					decoration="fill"
					size="full"
					type="submit"
					disabled={!isValid || !!isLoading}
				/>
			</form>
			<div className="flex items-center justify-center mt-4 w-full">
				<Typography
					type="link"
					className="text-sm text-center"
					href={'/auth/signup'}
				>
					Sign up
				</Typography>
			</div>
		</LayoutAuth>
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
		props: { session },
	};
};

export default SignIn;
