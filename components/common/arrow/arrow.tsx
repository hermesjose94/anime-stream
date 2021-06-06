import * as React from 'react';
import clsx from 'clsx';
import styles from './arrow.module.scss';

export interface ArrowProps {
	type: 'right' | 'left' | 'up' | 'down';
	color:
		| 'primary'
		| 'secondary'
		| 'white'
		| 'gray-500'
		| 'gray-800'
		| 'gray-900';
}

export const Arrow: React.FC<ArrowProps> = ({ type, color }) => {
	return (
		<i
			className={clsx(
				styles.arrow,
				{ 'border-primary': color === 'primary' },
				{ 'border-secondary': color === 'secondary' },
				{ 'border-white': color === 'white' },
				{ 'border-gray-500': color === 'gray-500' },
				{ 'border-gray-800': color === 'gray-800' },
				{ 'border-gray-900': color === 'gray-900' },
				{ 'transform -rotate-45': type === 'right' },
				{ 'transform rotate-135': type === 'left' },
				{ 'transform -rotate-135': type === 'up' },
				{ 'transform rotate-45': type === 'down' }
			)}
		></i>
	);
};
