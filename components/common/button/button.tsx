import clsx from 'clsx';
import { Icon } from 'components/icon';
import { IconsType } from 'interfaces';
import Link from 'next/link';
import * as React from 'react';
import { Typography } from '../typography';

export interface ButtonProps {
	size?: 'extra-small' | 'small' | 'medium' | 'large' | 'full';
	label?: string;
	disabled?: boolean;
	onClick?: () => void;
	href?: string;
	decoration?: 'fill' | 'line-white' | 'line-primary';
	social?: 'facebook' | 'google';
	icon?: IconsType;
	className?: string;
	withBorder?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<
	ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	size,
	label,
	disabled,
	onClick,
	decoration,
	social,
	icon,
	withBorder = true,
	className,
	children,
	...props
}) => {
	return (
		<>
			<button
				type="button"
				disabled={disabled}
				onClick={onClick}
				className={clsx(
					className,
					// with border
					{ 'border-none': !withBorder },
					//size
					{ 'w-full': size === 'full' },
					{ 'w-75': size === 'large' },
					{ 'w-61': size === 'medium' },
					{ 'w-48': size === 'small' },
					{ 'w-37': size === 'extra-small' },
					//fill
					{
						'text-white bg-primary': decoration === 'fill' && !social,
					},
					{
						'hover:bg-secondary': decoration === 'fill' && !social && !disabled,
					},
					//not fill white
					{
						'text-white border-white': decoration === 'line-white' && !social,
					},
					{
						'hover:bg-primary hover:text-white hover:border-primary':
							decoration === 'line-white' && !social && !disabled,
					},
					//not fill primary
					{
						'text-primary border-primary':
							decoration === 'line-primary' && !social,
					},
					{
						'hover:bg-primary hover:text-white hover:border-primary':
							decoration === 'line-primary' && !social && !disabled,
					},
					//disabled
					{
						'disabled:bg-primary disabled:text-white disabled:opacity-70': !social,
					},
					//facebook
					{ 'text-facebook border-facebook': social === 'facebook' },
					{
						'hover:text-white hover:bg-facebook':
							social === 'facebook' && !disabled,
					},
					//google
					{ 'text-gray-500 border-gray-500': social === 'google' },
					{
						'hover:text-white hover:bg-gray-500':
							social === 'google' && !disabled,
					},
					//disable social
					{
						'disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-900 disabled:opacity-50': social,
					},
					//global
					'group flex items-center justify-center px-8 py-3 border rounded-lg outline-none transition-colors duration-300 transform',
					'focus:outline-none',
					'disabled:cursor-not-allowed'
				)}
				{...props}
			>
				{label ? (
					<Typography type="buttom">
						<div className="flex items-center">
							{icon && (
								<div className="mr-4 w-4 h-4">
									<Icon
										src={icon}
										fillPath={social === 'facebook'}
										className={clsx(
											{
												'text-facebook ': social === 'facebook',
											},
											{
												'group-hover:text-white':
													social === 'facebook' && !disabled,
											}
										)}
									/>
								</div>
							)}{' '}
							<span>{label}</span>
						</div>
					</Typography>
				) : (
					children
				)}
			</button>
		</>
	);
};

export const ButtonContent: React.FC<
	ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	size,
	label,
	disabled,
	onClick,
	href,
	decoration = 'fill',
	social,
	icon,
	children,
	...props
}) => {
	return (
		<>
			{href ? (
				<Link href={href}>
					<a>
						<Button
							size={size}
							label={label}
							disabled={disabled}
							href={href}
							decoration={decoration}
							social={social}
							icon={icon}
							{...props}
						/>
					</a>
				</Link>
			) : (
				<Button
					size={size}
					label={label}
					disabled={disabled}
					onClick={onClick}
					href={href}
					decoration={decoration}
					social={social}
					icon={icon}
					{...props}
				>
					{children}
				</Button>
			)}
		</>
	);
};
