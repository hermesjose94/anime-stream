import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/common/button/button';
import { InputList } from 'components/common/form/input-list';

type PasswordFormProps = {
	onHandleSubmit: (data: any) => void;
	defaultRole: string;
	isLoading: boolean;
};

export const RoleForm: React.FC<PasswordFormProps> = ({
	onHandleSubmit,
	defaultRole,
	isLoading,
}) => {
	const { register, handleSubmit, errors, watch, setValue } = useForm({
		mode: 'onChange',
	});

	const rules = {
		role: {
			required: { value: true, message: 'This is required' },
		},
	};

	const roles = [
		{ text: 'User', value: 'user', disabled: false, placeholder: false },
		{ text: 'Admin', value: 'admin', disabled: false, placeholder: false },
	];

	return (
		<form
			className="w-full"
			onSubmit={handleSubmit((data) => onHandleSubmit(data))}
		>
			<InputList
				name="role"
				title="Role"
				className="mb-4"
				options={roles}
				register={register}
				rules={rules.role}
				error={errors.role}
				isFill={!!watch('')}
				myDefaultValue={defaultRole}
				handleChange={(value: string) => setValue('role', value)}
			/>
			<div className="flex items-center justify-center mt-4 w-full">
				<Button
					label={isLoading ? 'Loading...' : 'Edit'}
					decoration={'fill'}
					size="large"
					type="submit"
					disabled={isLoading}
				/>
			</div>
		</form>
	);
};
