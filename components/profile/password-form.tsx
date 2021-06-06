import * as React from 'react';
import { useForm } from 'react-hook-form';
import { InputPassword } from 'components/common/form/input-password';
import { Button } from 'components/common/button/button';

type PasswordFormProps = {
	onHandleSubmit: (data: any) => void;
	isLoading: boolean;
};

export const PasswordForm: React.FC<PasswordFormProps> = ({
	onHandleSubmit,
	isLoading,
}) => {
	const {
		register,
		handleSubmit,
		errors,
		formState: { isDirty, isValid },
		watch,
	} = useForm({ mode: 'onChange' });

	const rules = {
		password: {
			required: { value: true, message: 'This is required' },
		},
		confirmPassword: {
			required: { value: true, message: 'This is required' },
			validate: (value: string) =>
				value === watch('password') || `Passwords don't match`,
		},
	};

	return (
		<form
			className="w-full"
			onSubmit={handleSubmit((data) => onHandleSubmit(data))}
		>
			<InputPassword
				name="password"
				title="New password"
				register={register}
				rules={rules.password}
				error={errors.password}
			/>
			<InputPassword
				name="confirmPassword"
				title="Confirm password"
				register={register}
				rules={rules.confirmPassword}
				error={errors.confirmPassword}
				validate={false}
			/>
			<div className="flex items-center justify-center mt-4 w-full">
				<Button
					label={isLoading ? 'Loading...' : 'Changed'}
					decoration={'fill'}
					size="large"
					type="submit"
					disabled={!isDirty || !isValid || isLoading}
				/>
			</div>
		</form>
	);
};
