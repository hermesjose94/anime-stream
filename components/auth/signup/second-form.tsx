import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/common/button/button';
import { InputDate } from 'components/common/form/input-date';
import { InputList } from 'components/common/form/input-list';
import { InputText } from 'components/common/form/input-text';
import { gender, country } from 'consts/index';

type SecondFormProps = {
	onHandleSubmit: (data: any) => void;
	initialData: Record<string, string> | null;
};

export const SecondForm: React.FC<SecondFormProps> = ({
	onHandleSubmit,
	initialData,
}) => {
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		formState: { isValid },
		watch,
	} = useForm({ mode: 'onBlur', defaultValues: initialData || undefined });

	React.useEffect(() => {
		const $fullNameInput = document.getElementById('fullname');
		if ($fullNameInput) {
			$fullNameInput.focus();
		}
	}, []);

	const rules = {
		fullname: {
			required: { value: true, message: 'This is required' },
		},
		birthday: {
			required: { value: true, message: 'This is required' },
		},
		gender: {
			// required: { value: true, message: 'This is required' },
		},
		country: {
			// required: { value: true, message: 'This is required' },
		},
	};

	return (
		<form
			className="w-full"
			onSubmit={handleSubmit((data) => onHandleSubmit(data))}
		>
			<InputText
				name="fullname"
				title="Full Name"
				register={register}
				rules={rules.fullname}
				error={errors.fullname}
				isFill={!!watch('fullname')}
			/>
			<InputDate
				name="birthday"
				title="Date of birth"
				register={register}
				rules={rules.birthday}
				error={errors.birthday}
				isFill={!!watch('birthday')}
			/>
			<InputList
				name="gender"
				title="Gender"
				className="mb-4"
				options={gender}
				register={register}
				rules={rules.gender}
				error={errors.gender}
				myDefaultValue={watch('gender')}
				handleChange={(value: string) => setValue('gender', value)}
			/>
			<InputList
				name="country"
				title="Country"
				className="mb-4"
				options={country}
				register={register}
				rules={rules.country}
				error={errors.country}
				myDefaultValue={watch('country')}
				handleChange={(value: string) => setValue('country', value)}
			/>

			<div className="flex items-center justify-center mt-48 w-full">
				<Button
					label="Continue"
					decoration="fill"
					size="large"
					type="submit"
					disabled={!isValid || !watch('gender') || !watch('country')}
				/>
			</div>
		</form>
	);
};
