import * as React from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { Icons } from 'interfaces';
import { useModal } from 'hooks/modal';
import { LayoutDashboard } from 'components/layout';
import { Typography } from 'components/common/typography';
import { InputText } from 'components/common/form/input-text';
import { InputPassword } from 'components/common/form/input-password';
import { InputEmail } from 'components/common/form/input-email';
import { InputCheck } from 'components/common/form/input-check';
import { InputRadio } from 'components/common/form/input-radio';
import { Button } from 'components/common/button';
import { InputDate } from 'components/common/form/input-date';
import { Toggle } from 'components/common/form/toggle';
import { Separator } from 'components/common/separator';
import { InputList } from 'components/common/form/input-list';
import { ToggleDark } from 'components/common/form/toggle-dark';
import { BottomSheet } from 'components/common/bottom-sheet';
import { VerificationCode } from 'components/verification-code';
import { InputPhone } from 'components/common/form/input-phone';
import { InputRange } from 'components/common/form/input-range';
import { InputCard } from 'components/common/form/input-card';
import { InputNumber } from 'components/common/form/input-number';

const GuideStyles: React.FC = () => {
	const { register, handleSubmit, errors, watch, setValue } = useForm({
		mode: 'onChange',
	});
	const { Modal, hide, show, isShow } = useModal();
	const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
	const gender = [
		{
			text: 'Choose an option',
			value: '',
			disabled: false,
			placeholder: true,
		},
		{ text: 'Male', value: 'male', disabled: false, placeholder: false },
		{ text: 'Female', value: 'male', disabled: false, placeholder: false },
		{ text: 'Not selected', value: 'not', disabled: true, placeholder: false },
		{
			text: 'Do not specify',
			value: 'undefined',
			disabled: false,
			placeholder: false,
		},
	];

	const rules = {
		username: {
			required: { value: true, message: 'This is required' },
		},
		email: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
		date: {
			required: { value: true, message: 'This is required' },
		},
		phone: {
			required: { value: true, message: 'This is required' },
		},
		card: {
			required: { value: true, message: 'This is required' },
		},
		number: {
			required: { value: true, message: 'This is required' },
		},
		check: {},
		radio: {},
		gender: {},
		darkMode: {},
		toogle: {},
		toogle2: {},
		toogle3: {},
		toogle4: {},
		range: {},
	};

	const onSubmit = async (data: any) => {
		console.log(data);
	};

	const onSubmitVerificationCode = (value: string) => {
		console.log(value);
		setIsBottomSheetOpen(false);
	};

	const setValueInput = (name: string, text: string) => {
		setValue(name, text, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	return (
		<LayoutDashboard title="Guide Styles">
			<Typography type="title" className="mb-3">
				Typography....
			</Typography>
			<Separator />
			<Separator text="Title 30px" />
			<Typography type="title" className="mb-3">
				YOUR PERSONAL EQUALIZER
			</Typography>
			<Separator text="Title Small 20px" />
			<Typography type="title-small" className="mb-3">
				YOUR PERSONAL EQUALIZER
			</Typography>
			<Separator text="Sub Title 18px" />
			<Typography type="sub-title" className="mb-3">
				You’re about to become the newest member of this bad ass business social
				network. New powerful relationships, faster success and a far more
				interesting life!
			</Typography>
			<Separator text="Text Base 16px" />
			<Typography type="text-base" className="mb-3">
				FREE MEMBER
			</Typography>
			<Separator text="Sub Title Small 14px" />
			<Typography type="sub-title-small" className="mb-3">
				Enter your username or the email liked to your account
			</Typography>
			<Separator text="Label 12px" />
			<Typography type="label" className="font-bold">
				It is Label
			</Typography>
			<Separator text="Caption 12px" />
			<Typography type="caption" className="mb-3 mt-3">
				{`"It is Small Caption. Forgot your login details?`}{' '}
				<Typography type="link" className="mb-3 mt-3">
					Get help logging in
				</Typography>
			</Typography>
			<Separator text="Small 10px" />
			<Typography type="small" className="mb-3 mt-3">
				© EPX, 2021. All Rights Reserved.
			</Typography>
			<Separator text="Link" />
			<Typography type="link" className="mb-3 mt-3" href="/guide-styles">
				Forgot your password?
			</Typography>
			<Separator text="Form" />
			{/* <div className="max-w-md mx-auto">
				<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
					<InputText
						name="username"
						title="Username"
						register={register}
						rules={rules.username}
						error={errors.username}
						isFill={!!watch('username')}
					/>
					<InputNumber
						name="number"
						title="Number"
						maxLength={4}
						customPlaceholder="123"
						NoterrorMessage
						className="w-[98px]"
						register={register}
						rules={rules.number}
						error={errors.number}
						isFill={!!watch('number')}
						setValueInput={(name, text) => {
							setValueInput(name, text);
						}}
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
					<InputDate
						name="date"
						title="Birth day"
						register={register}
						rules={rules.date}
						error={errors.date}
						isFill={!!watch('date')}
					/>
					<InputPhone
						name="phone"
						title="Phone number"
						customPlaceholder="+1 123 123 1234"
						register={register}
						rules={rules.phone}
						error={errors.phone}
						isFill={!!watch('phone')}
						setValueInput={(name, text) => {
							setValueInput(name, text);
						}}
					/>
					<InputCard
						name="card"
						title="Card Number"
						customPlaceholder="1234 1234 1234 1234"
						register={register}
						rules={rules.card}
						error={errors.card}
						isFill={!!watch('card')}
						setValueInput={(name, text) => {
							setValueInput(name, text);
						}}
					/>
					<InputText
						name="disabled"
						title="Disabled"
						disabled
						isFill={!!watch('disabled')}
					/>
					<InputCheck
						name="check"
						className="mb-3 mt-3"
						register={register}
						rules={rules.check}
						error={errors.check}
					>
						Agree to your terms of service and privacy policy and I confirm that
						I am at least 18 years old.
					</InputCheck>
					<InputCheck name="check2" className="mb-3" disabled>
						I am disabled
					</InputCheck>
					<InputRadio
						name="radio"
						className="mb-3"
						value="radio 1"
						register={register}
						rules={rules.radio}
						error={errors.radio}
					>
						I am input radio
					</InputRadio>
					<InputRadio
						name="radio"
						className="mb-3"
						value="radio 2"
						register={register}
						rules={rules.radio}
						error={errors.radio}
					>
						I am input radio 2
					</InputRadio>
					<InputRadio name="radio2" disabled className="mb-3" value="3">
						I am disabled
					</InputRadio>
					<InputList
						name="gender"
						title="Gender"
						className="mb-4"
						options={gender}
						register={register}
						rules={rules.gender}
						error={errors.gender}
						isFill={!!watch('')}
						handleChange={(value) => console.log(value)}
					/>

					<div className="grid gap-4 grid-cols-2 mb-10 mt-4 w-full">
						<ToggleDark
							isActive={false}
							name="darkMode"
							register={register}
							rules={rules.darkMode}
						/>
						<div></div>
						<Toggle
							isActive={false}
							name="toogle"
							register={register}
							rules={rules.toogle}
						/>
						<Toggle
							isActive={true}
							name="toogle2"
							register={register}
							rules={rules.toogle2}
						/>
						<div className="flex items-center justify-between">
							<Toggle
								isActive={true}
								name="toogle3"
								register={register}
								rules={rules.toogle3}
							/>
							<Typography type="span">Expample</Typography>
						</div>
						<div></div>
						<div className="flex items-center justify-between">
							<Typography type="span">Expample 2</Typography>
							<Toggle
								isActive={false}
								name="toogle4"
								register={register}
								rules={rules.toogle4}
							/>
						</div>
					</div>
					<InputRange
						name="range"
						title="Input Range"
						min="0"
						max="100"
						defaultValue={10}
						prefix={'$'}
						sufix={'%'}
						setValueInput={(name, text) => {
							setValueInput(name, text);
						}}
						register={register}
						rules={rules.range}
					/>
					<div className="flex items-center justify-center w-full mt-4">
						<Button label="Submit" size="small" type="submit" />
					</div>
				</form>
			</div>

			<Separator text="Buttons" />
			<Separator text="Fill" />
			<div className="flex items-center justify-center">
				<Button label="Login" decoration="fill" className="mb-4" />
			</div>
			<Separator text="Not fill primary" />
			<div className="flex items-center justify-center">
				<Button label="Login" decoration="line-primary" className="mb-4" />
			</div>
			<Separator text="Not fill white" />
			<div className="bg-gray-900 p-4 mb-4 flex items-center justify-center">
				<Button label="Unfollow" decoration="line-white" />
			</div>
			<Separator text="Disabled" />
			<div className="flex items-center justify-center">
				<Button label="Disabled" decoration="fill" disabled className="mb-4" />
			</div>
			<Separator text="Large" />
			<div className="flex items-center justify-center">
				<Button label="Login" decoration="fill" size="large" />
			</div>
			<Separator text="Med" />
			<div className="flex items-center justify-center">
				<Button label="Continue" decoration="fill" size="medium" />
			</div>
			<Separator text="Small" />
			<div className="flex items-center justify-center">
				<Button label="Continue" decoration="fill" size="small" />
			</div>
			<Separator text="Extra small" />
			<div className="flex items-center justify-center">
				<Button label="Continue" decoration="fill" size="extra-small" />
			</div>
			<Separator text="Social" />
			<div className="flex items-center justify-center flex-col">
				<Button
					label="Sign in with Facebook"
					social={'facebook'}
					icon={Icons.facebook}
					className="mb-4"
					size="large"
				/>
				<Button
					label="Sign in with Google"
					social={'google'}
					icon={Icons.google}
					className="mb-4"
					size="large"
				/>
				<Button
					label="Sign in with Facebook"
					social={'facebook'}
					icon={Icons.facebook}
					disabled
					className="mb-4"
					size="large"
				/>
				<Button
					label="Sign in with Google"
					social={'google'}
					icon={Icons.google}
					disabled
					className="mb-4"
					size="large"
				/>
				<Separator text="Modal" />
				<Button label="open modal" onClick={() => show()} size="large" />
				<Separator text="Bt Sheet" />
				<Button
					label="open bottom sheet"
					size="large"
					onClick={() => setIsBottomSheetOpen(true)}
				/>
			</div> */}
			{/* <Modal isShow={isShow}>
				<div className="flex flex-col w-full h-full">
					<Typography type="title" className="mb-6">
						Delete account
					</Typography>
					<Typography
						type="sub-title-small"
						className="mb-9 text-center text-gray-800"
					>
						Are you sure to delete this account?
					</Typography>
					<Button label="Delete" onClick={hide} />
					<p
						onClick={hide}
						className={clsx(
							'font-bold text-primary transition-colors duration-200 transform mt-4 text-center cursor-pointer',
							'hover:text-secondary'
						)}
					>
						Cancel
					</p>
				</div>
			</Modal>
			{isBottomSheetOpen && (
				<BottomSheet>
					<VerificationCode
						resendCode={() => console.log('resenging code')}
						onSubmit={onSubmitVerificationCode}
						isLoading={false}
					/>
				</BottomSheet>
			)} */}
		</LayoutDashboard>
	);
};

export default GuideStyles;
