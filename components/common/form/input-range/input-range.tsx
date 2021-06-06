import * as React from 'react';
import styles from './input-range.module.scss';
import { Typography } from 'components/common/typography';
import { InputProps } from 'interfaces/common';
import clsx from 'clsx';

export interface InputSlideProps {
	name: string;
	min: string;
	max: string;
	defaultVal?: string;
	getVal?: (val: string) => any;
}
export const InputRange: React.FC<
	InputProps & InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
	name,
	title,
	prefix,
	sufix,
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

	const handleChange = (e: any) => {
		const val = e.target.value;
		const $inputRange = document.getElementById(name);
		if ($inputRange) {
			$inputRange.style.background = `linear-gradient(to right,var(--color-primary) 0%,var(--color-primary) ${val}%,var(--color-gray-500) ${val}%,var(--color-gray-500) 100%)`;
		}
		setValueLabel(val);
		onChangeState && onChangeState(true);
		setValueInput && setValueInput(name, val);
	};

	React.useEffect(() => {
		const $inputRange = document.getElementById(name);
		if ($inputRange) {
			$inputRange.style.background = `linear-gradient(to right,var(--color-primary) 0%,var(--color-primary) ${defaultValue}%,var(--color-gray-500) ${defaultValue}%,var(--color-gray-500) 100%)`;
		}
	}, [defaultValue]);

	return (
		<>
			<div className={clsx('flex flex-col py-2 w-full', className)}>
				<Typography type="label">
					{title}
					{optional && (
						<Typography type="label" className={'text-gray-500'}>
							{` (Optional)`}
						</Typography>
					)}
				</Typography>
				<div className="flex items-center py-2">
					<input
						id={name}
						name={name}
						className={styles.rangeSlider__range}
						type="range"
						onChange={handleChange}
						defaultValue={defaultValue}
						min={min}
						max={max}
						ref={register ? register(rules) : () => ({})}
						{...props}
					/>
					<Typography
						type="sub-title-small"
						className="ml-[9px]  text-gray-500"
					>
						{prefix && `${prefix} `}
						{`${valueLabel}`}
						{sufix && ` ${sufix}`}
					</Typography>
				</div>
			</div>
		</>
	);
};
