import * as React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import styles from './input.module.scss';
import { Typography } from '../../typography';
import { InputProps } from 'interfaces/common';

export const Input: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
	name,
	title,
	isFill,
	register,
	rules,
	rightImg,
	leftImg,
	rightClick,
	leftClick,
	error,
	className,
	customPlaceholder,
	...props
}) => {
	return (
		<div className={clsx('relative flex flex-col w-full', className)}>
			<div className={clsx(styles.input)}>
				<Typography
					type="label"
					className={clsx({ 'text-status-error': error }, 'font-bold')}
				>
					{title}
				</Typography>
				<input
					id={name}
					name={name}
					placeholder={customPlaceholder}
					autoComplete="off"
					className={clsx(
						{
							'border-status-error placeholder-status-error text-status-error': error,
						},
						{ 'mb-6': !error },
						{ 'px-4': !leftImg && !rightImg },
						{ 'pl-9 pr-4': leftImg },
						{ 'pr-9 pl-4': rightImg },
						{ 'bg-transparent-color-gray-200': isFill },
						{ 'bg-transparent': !isFill },
						!!isFill && styles.inputDateWithValue,
						'py-3 placeholder-gray-200 mt-2 w-full text-gray-800 font-montserrat text-sm border border-gray-200 rounded-lg',
						'disabled:placeholder-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-800',
						'focus:outline-none focus:bg-transparent focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-200 focus:ring-transparent'
					)}
					ref={register ? register(rules) : () => ({})}
					{...props}
				/>

				{error && error.message && (
					<span className="flex items-center mt-2 text-status-error font-montserrat">
						<div className="mr-1 w-4 h-4">
							<ExclamationCircleIcon className="w-4 text-status-error" />
						</div>
						<Typography type="caption">{error.message}</Typography>
					</span>
				)}
				{leftImg && (
					<div onClick={leftClick} className="absolute left-7 top-12 w-4 h-3">
						{leftImg}
					</div>
				)}
				{rightImg && (
					<div onClick={rightClick} className="absolute right-4 top-12 w-4 h-3">
						{rightImg}
					</div>
				)}
			</div>
		</div>
	);
};
