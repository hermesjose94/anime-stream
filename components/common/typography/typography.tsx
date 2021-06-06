import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export interface TypographyProps {
	type:
		| 'title'
		| 'title-small'
		| 'sub-title'
		| 'sub-title-small'
		| 'text-base'
		| 'label'
		| 'caption'
		| 'span'
		| 'link'
		| 'buttom'
		| 'small';
	text?: string;
	className?: string;
	href?: string;
	onClick?: () => void;
}

export const Typography: React.FC<TypographyProps> = ({
	type,
	children,
	text = '',
	className = '',
	href,
	onClick,
}) => {
	if (type === 'title')
		return (
			<h1
				className={clsx(
					'text-center text-2xl font-black uppercase',
					'2xl:text-3xl',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);
	if (type === 'title-small')
		return (
			<h1
				className={clsx('text-xl font-bold', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);
	if (type === 'sub-title')
		return (
			<h2
				className={clsx(
					'text-base font-light text-center',
					'2xl:text-lg',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h2>
		);

	if (type === 'sub-title-small')
		return (
			<h2
				className={clsx('text-sm font-light', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h2>
		);
	if (type === 'text-base')
		return (
			<h2
				className={clsx('text-base', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h2>
		);

	if (type === 'label')
		return (
			<label
				className={clsx('text-sm font-normal', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</label>
		);

	if (type === 'span')
		return (
			<span className={clsx(className)} onClick={() => onClick && onClick()}>
				{children || text}
			</span>
		);

	if (type === 'caption')
		return (
			<p
				className={clsx('text-xs', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</p>
		);

	if (type === 'small')
		return <p className={clsx('text-[10px]', className)}>{children || text}</p>;

	if (type === 'link')
		return (
			<Link href={href || '/'}>
				<a
					className={clsx(
						'font-bold text-primary transition-colors duration-200 transform',
						'hover:text-secondary',
						className
					)}
				>
					{children || text}
				</a>
			</Link>
		);

	if (type === 'buttom')
		return (
			<h2 className={clsx('text-sm font-normal', '2xl:text-base', className)}>
				{children || text}
			</h2>
		);

	return null;
};
