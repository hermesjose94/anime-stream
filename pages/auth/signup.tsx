import * as React from 'react';
import { LayoutAuth } from 'components/layout';
import { Images } from 'interfaces';
import { Typography } from 'components/common/typography';
import { Button } from 'components/common/button';
import { getSession, signIn, signin } from 'next-auth/client';
import { useRouter } from 'next/router';
import { registerUser } from 'api';
import { useToasts } from 'react-toast-notifications';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/common/form/input-text';
import { InputEmail } from 'components/common/form/input-email';
import { InputPassword } from 'components/common/form/input-password';
import { Logo } from 'components/logo';

const SignUp = () => {
	const { addToast } = useToasts();
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		errors,
		formState: { isDirty, isValid },
	} = useForm({ mode: 'onChange' });

	const rules = {
		fullname: {
			required: { value: true, message: 'This is required' },
		},
		username: {
			required: { value: true, message: 'This is required' },
			minLength: {
				value: 3,
				message: 'username must be larger than or equal to 3 characters',
			},
		},
		email: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
	};

	const onSubmitForm = async (data: any) => {
		setIsLoading(true);
		try {
			const response = await registerUser(data);
			const json = await response.json();
			if (json.error) {
				addToast(json.error, { appearance: 'error' });
			} else {
				try {
					const resLogin = await signIn('credentials', {
						redirect: false,
						username: data.username,
						password: data.password,
						callbackUrl: '/',
					});
					if (resLogin?.error) {
						addToast('Invalid password o email', { appearance: 'error' });
					} else {
						router.push('/');
					}
				} catch (error) {
					addToast(error, { appearance: 'error' });
				}
			}
		} catch (error) {
			addToast(error, { appearance: 'error' });
		}
		setIsLoading(false);
	};

	return (
		<LayoutAuth Image={Images.register}>
			<div className="center flex flex-col items-center justify-center px-9 py-5 w-full">
				<div className="w-full flex justify-center items-center">
					<Logo />
				</div>
				<Typography type="text-base" className="text-center mt-2 mb-3">
					Join us and live the experience
				</Typography>
				<form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
					<InputText
						name="username"
						title="Username"
						register={register}
						rules={rules.username}
						error={errors.username}
					/>
					<InputEmail
						name="email"
						title="Email"
						register={register}
						rules={rules.email}
						error={errors.email}
					/>
					<InputPassword
						name="password"
						title="Password"
						register={register}
						rules={rules.password}
						error={errors.password}
					/>
					<InputText
						name="fullname"
						title="Full Name"
						register={register}
						rules={rules.fullname}
						error={errors.fullname}
					/>
					<div className="flex items-center justify-center mt-4 w-full">
						<Button
							label="Sign up"
							decoration={'fill'}
							size="large"
							type="submit"
							disabled={!isDirty || !isValid || isLoading}
						/>
					</div>
				</form>
				<div className="flex items-center justify-center mt-4 w-full">
					<Typography
						type="link"
						href={'/auth/signin'}
						className="text-sm text-center"
					>
						Login
					</Typography>
				</div>
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

export default SignUp;
