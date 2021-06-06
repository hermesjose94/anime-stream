import * as React from 'react';
import clsx from 'clsx';
import { Avatar } from 'components/common/avatar';
import { Typography } from 'components/common/typography';

const fakeUsers = [
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
	'maria',
];

export const Recommended = () => {
	return (
		<div className="grid gap-2 py-2 overflow-hidden border-b border-gray-200">
			<Typography type="span" className="pl-9">
				Recommended
			</Typography>
			<ul className="overflow-x-scroll grid grid-flow-col gap-[18px] hide-scroll-bar">
				{fakeUsers.map((user, index) => (
					<li
						key={`${user}${index}`}
						className={clsx(
							!index && 'pl-9',
							fakeUsers.length - 1 === index && 'pr-9'
						)}
					>
						<Avatar username={`${user}${index}`} size="big" />
					</li>
				))}
			</ul>
		</div>
	);
};
