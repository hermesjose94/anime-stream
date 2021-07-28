import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { LayoutDashboard } from 'components/layout';
import { Button } from 'components/common/button';
import { registerUser } from 'api';
import { UserType } from 'interfaces';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/common/form/input-text';
import { InputEmail } from 'components/common/form/input-email';
import { InputPassword } from 'components/common/form/input-password';

const Create = () => {
	const router = useRouter();
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = React.useState(false);
	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid, errors },
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
				addToast('User created', {
					appearance: 'success',
				});
				router.push('/dashboard/users');
			}
		} catch (error) {
			addToast(error, { appearance: 'error' });
		}
		setIsLoading(false);
	};

	return (
		<LayoutDashboard title="Create User" showBack>
			<div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
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
							label="Create"
							decoration={'fill'}
							size="large"
							type="submit"
							disabled={!isDirty || !isValid || isLoading}
						/>
					</div>
				</form>
			</div>
		</LayoutDashboard>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const user = session?.user as unknown as UserType;
	if (session && session.user && user.role !== 'admin') {
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

export default Create;
