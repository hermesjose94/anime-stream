import { Button } from 'components/common/button/button';
import { InputCheck } from 'components/common/form/input-check';
import { InputEmail } from 'components/common/form/input-email';
import { InputPassword } from 'components/common/form/input-password';
import { InputText } from 'components/common/form/input-text';
import * as React from 'react';
import { useForm } from 'react-hook-form';

type FirstFormProps = {
	onHandleSubmit: (data: any) => void;
	initialData: Record<string, string> | null;
};

export const FirstForm: React.FC<FirstFormProps> = ({
	onHandleSubmit,
	initialData,
}) => {
	const {
		register,
		handleSubmit,
		errors,
		formState: { isDirty, isValid },
		watch,
	} = useForm({ mode: 'onBlur', defaultValues: initialData || undefined });

	const rules = {
		firstName: {
			required: { value: true, message: 'This is required' },
		},
		lastName: {
			required: { value: true, message: 'This is required' },
		},
		username: {
			required: { value: true, message: 'This is required' },
			maxLength: {
				value: 8,
				message: 'username must be shorter than or equal to 8 characters',
			},
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
		check: {},
	};

	return (
		<form
			className="w-full"
			onSubmit={handleSubmit((data) => onHandleSubmit(data))}
		>
			<InputText
				name="username"
				title="Username"
				register={register}
				rules={rules.username}
				error={errors.username}
				isFill={!!watch('username')}
			/>
			<InputEmail
				name="email"
				title="Email"
				register={register}
				rules={rules.email}
				error={errors.email}
				isFill={!!watch('email')}
			/>
			<InputPassword
				name="password"
				title="Password"
				register={register}
				rules={rules.password}
				error={errors.password}
				isFill={!!watch('password')}
			/>
			<InputCheck
				name="check"
				className="mb-3 mt-7"
				register={register}
				rules={rules.check}
				error={errors.check}
			>
				Agree to your terms of service and privacy <br /> policy and I confirm
				that I am at least 18 <br />
				years old.
			</InputCheck>
			<div className="flex items-center justify-center mt-9 w-full">
				<Button
					label="Sign up"
					decoration="fill"
					size="large"
					type="submit"
					disabled={!isDirty || !isValid || !watch('check')}
				/>
			</div>
		</form>
	);
};
