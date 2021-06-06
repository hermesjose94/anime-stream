import * as React from 'react';
import clsx from 'clsx';
import { Typography } from '../typography';

type AvatarProps = {
	size: 'small' | 'medium' | 'big';
	src?: string;
	username?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ size, src, username = '' }) => {
	return (
		<div
			className={clsx(
				'grid gap-1',
				{ 'w-6': size === 'small' },
				{ 'w-9': size === 'medium' },
				{ 'w-12': size === 'big' }
			)}
		>
			<img
				src={src || '/img/mock/avatar.png'}
				alt="avatar"
				className={clsx(
					{ 'w-6 h-6': size === 'small' },
					{ 'w-9 h-9': size === 'medium' },
					{ 'w-12 h-12': size === 'big' }
				)}
			/>
			{!!username && (
				<Typography type="caption" className="text-center">
					{username}
				</Typography>
			)}
		</div>
	);
};
