import clsx from 'clsx';
import * as React from 'react';
import styles from './box.module.scss';

export const Box: React.FC = () => {
	return (
		<div
			className={clsx(
				'm-4 bg-primary rounded-lg',
				'md:bg-gray-500',
				styles.box
			)}
		></div>
	);
};
