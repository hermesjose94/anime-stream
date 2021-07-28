import * as React from 'react';
import styles from './input-range.module.scss';
import { Typography } from 'components/common/typography';
import { InputProps } from 'interfaces/common';
import clsx from 'clsx';

export const InputRange: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
	name,
	title,
	prefix,
	sufix,
	hideTitle = false,
	defaultValue = 0,
	setValueInput,
	optional = false,
	register,
	rules,
	className,
	min,
	max,
	onChangeState,
	...props
}) => {
	const [valueLabel, setValueLabel] = React.useState(defaultValue);
	const registerInput = register(name, rules);

	const handleChange = (e: any) => {
		const val = e.target.value;
		const porcentage = (Number(val) * 100) / Number(max);
		const $inputRange = document.getElementById(name);
		if ($inputRange) {
			$inputRange.style.background = `linear-gradient(to right,var(--color-primary) 0%,var(--color-primary) ${porcentage}%,var(--color-gray-500) ${porcentage}%,var(--color-gray-500) 100%)`;
		}
		setValueLabel(val);
		onChangeState && onChangeState(true);
		setValueInput && setValueInput(name, val);
	};

	React.useEffect(() => {
		const $inputRange = document.getElementById(name);
		const porcentage = (Number(defaultValue) * 100) / Number(max);
		if ($inputRange) {
			$inputRange.style.background = `linear-gradient(to right,var(--color-primary) 0%,var(--color-primary) ${porcentage}%,var(--color-gray-500) ${porcentage}%,var(--color-gray-500) 100%)`;
		}
	}, [defaultValue]);

	return (
		<>
			<div className={clsx('flex flex-col py-2 w-full', className)}>
				{!hideTitle && (
					<Typography type="label">
						{title}
						{optional && (
							<Typography type="label" className={'text-gray-500'}>
								{` (Optional)`}
							</Typography>
						)}
					</Typography>
				)}
				<div className="flex items-center py-2">
					<input
						id={name}
						{...registerInput}
						onChange={(e) => {
							registerInput.onChange(e);
							handleChange(e);
						}}
						className={styles.rangeSlider__range}
						type="range"
						defaultValue={defaultValue}
						min={min}
						max={max}
						{...props}
					/>
					<Typography
						type="sub-title-small"
						className="ml-[9px] text-gray-500 whitespace-nowrap"
					>
						{`${prefix ? prefix : ''} ${valueLabel} ${sufix ? sufix : ''}`}
					</Typography>
				</div>
			</div>
		</>
	);
};
