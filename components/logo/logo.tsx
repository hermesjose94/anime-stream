import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Images } from 'interfaces';
import clsx from 'clsx';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<Link href="/">
			<a className={clsx('cursor-pointer', className)}>
				<Image width={110} height={35} src={Images.logo} />
			</a>
		</Link>
	);
};
