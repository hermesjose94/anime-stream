import * as React from 'react';
import { useForm } from 'react-hook-form';
import { InputEmail } from 'components/common/form/input-email';
import { InputText } from 'components/common/form/input-text';
import { Button } from 'components/common/button/button';

type UserFormProps = {
	onHandleSubmit: (data: any) => void;
	initialData: Record<string, string>;
	isLoading: boolean;
};

export const UserForm: React.FC<UserFormProps> = ({
	onHandleSubmit,
	initialData,
	isLoading,
}) => {
	const {
		register,
		handleSubmit,
		errors,
		formState: { isDirty, isValid },
		setValue,
	} = useForm({ mode: 'onChange', defaultValues: initialData });

	React.useEffect(() => {
		setValue('username', initialData.username, {
			shouldValidate: true,
		});
		setValue('email', initialData.email, {
			shouldValidate: true,
		});
		setValue('fullname', initialData.fullname, {
			shouldValidate: true,
		});
	}, [initialData]);

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
			/>
			<InputEmail
				name="email"
				title="Email"
				register={register}
				rules={rules.email}
				error={errors.email}
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
					label={isLoading ? 'Loading...' : 'Edit'}
					decoration={'fill'}
					size="large"
					type="submit"
					disabled={!isDirty || !isValid || isLoading}
				/>
			</div>
		</form>
	);
};
