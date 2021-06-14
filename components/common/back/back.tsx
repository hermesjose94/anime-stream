import * as React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import clsx from 'clsx';

type BackProps = {
	className?: string;
};

export const Back: React.FC<BackProps> = ({ className }) => {
	const router = useRouter();
	return (
		<div className={clsx('flex items-center', className)}>
			<div
				className={clsx(
					'font-bold text-gray-800 cursor-pointer hover:opacity-50 text-sm',
					'2xl:text-xl'
				)}
				onClick={() => router.back()}
			>
				<ChevronLeftIcon
					className={clsx('w-6 text-gray-800 mr-2', '2xl:w-6')}
				/>
			</div>
		</div>
	);
};
