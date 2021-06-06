import * as React from 'react';
import { Button } from 'components/common/button';
import { InputPassword } from 'components/common/form/input-password';
import { useForm } from 'react-hook-form';

type FirstFormProps = {
	onHandleSubmit: (data: any) => void;
	isLoading: boolean;
};

export const SecondForm: React.FC<FirstFormProps> = ({
	onHandleSubmit,
	isLoading = false,
}) => {
	const { register, handleSubmit, errors, watch } = useForm<{
		newPassword: string;
		confirmPassword: string;
	}>({ mode: 'onChange' });

	const rules = React.useMemo(() => {
		return {
			newPassword: {
				required: { value: true, message: 'This is required' },
			},
			confirmPassword: {
				required: { value: true, message: 'This is required' },
				validate: (value: string) =>
					value === watch('newPassword') || `Passwords don't match`,
			},
		};
	}, []);

	return (
		<form
			className="w-full"
			onSubmit={handleSubmit((data) => onHandleSubmit(data))}
		>
			<InputPassword
				name="newPassword"
				title="New password"
				register={register}
				rules={rules.newPassword}
				error={errors.newPassword}
				isFill={!!watch('newPassword')}
			/>
			<InputPassword
				name="confirmPassword"
				title="Confirm password"
				register={register}
				rules={rules.confirmPassword}
				error={errors.confirmPassword}
				isFill={!!watch('confirmPassword')}
				validate={false}
			/>
			<div className="flex items-center justify-center mt-16 w-full">
				<Button
					label={isLoading ? 'Loading...' : 'Next'}
					fill
					size="large"
					type="submit"
					disabled={isLoading}
				/>
			</div>
		</form>
	);
};
