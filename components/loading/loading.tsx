import * as React from 'react';
import clsx from 'clsx';
import styles from './loading.module.scss';

export const Loading: React.FC<{ isSmall?: boolean }> = ({
	isSmall = false,
}) => {
	const background = {
		background:
			'linear-gradient(45deg,var(--color-secondary),var(--color-primary))',
	} as React.CSSProperties;
	return (
		<div
			className={clsx(
				'flex items-center justify-center w-full',
				{ 'h-20': isSmall },
				{ 'h-screen': !isSmall }
			)}
			style={background}
		>
			<div className={clsx(styles.skFoldingCube)}>
				<div className={clsx(styles.skCube1, styles.skCube)}></div>
				<div className={clsx(styles.skCube2, styles.skCube)}></div>
				<div className={clsx(styles.skCube4, styles.skCube)}></div>
				<div className={clsx(styles.skCube3, styles.skCube)}></div>
			</div>
		</div>
	);
};
