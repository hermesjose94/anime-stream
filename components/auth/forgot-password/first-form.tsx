import * as React from 'react';
import { Button } from 'components/common/button';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/common/form/input-text';

type FirstFormProps = {
	isLoading: boolean;
	onHandleSubmit: (data: any) => void;
};

export const FirstForm: React.FC<FirstFormProps> = ({
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
		email: {
			required: { value: true, message: 'This is required' },
		},
	};
	const isDisabled = isLoading || !isDirty || !isValid;
	return (
		<form
			className="w-full"
			onSubmit={handleSubmit((e) => onHandleSubmit(e.email))}
		>
			<InputText
				name="email"
				title="Username/Email"
				register={register}
				rules={rules.email}
				error={errors.email}
				isFill={!!watch('email')}
			/>
			<div className="flex items-center justify-center mt-37 w-full">
				<Button
					label={isLoading ? 'Loading...' : 'Next'}
					fill
					size="large"
					type="submit"
					disabled={isDisabled}
				/>
			</div>
		</form>
	);
};
