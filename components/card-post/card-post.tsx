import * as React from 'react';
import { Avatar } from 'components/common/avatar';
import { Typography } from 'components/common/typography';
import {
	DotsVerticalIcon,
	HeartIcon,
	ChatIcon,
	CurrencyDollarIcon,
} from '@heroicons/react/outline';

export const CardPost = () => {
	return (
		<div className="flex flex-col w-full">
			<div className="flex w-ful px-9 justify-between items-center mb-[18px]">
				<div className="grid grid-flow-col gap-2">
					<Avatar size="medium" />
					<div>
						<Typography type="smallTitle">Bodyposistylist</Typography>
						<Typography type="caption">1min ago</Typography>
					</div>
				</div>
				<DotsVerticalIcon
					className="w-6 cursor-pointer"
					style={{ marginRight: '-10px' }}
				/>
			</div>
			<div className="w-full mb-[15px]">
				<img
					src="/img/mock/card-post.png"
					alt="post"
					className="w-full object-contain"
				/>
			</div>
			<div className="px-9 flex justify-between items-center">
				<div className="grid grid-flow-col gap-[35px]">
					<div className="grid grid-flow-col gap-2 items-center">
						<HeartIcon className="w-[18px]" />
						<Typography type="caption">Like</Typography>
					</div>
					<div className="grid grid-flow-col gap-2 items-center">
						<ChatIcon className="w-[18px]" />
						<Typography type="caption">Comment</Typography>
					</div>
				</div>
				<div className="grid grid-flow-col gap-2 items-center">
					<CurrencyDollarIcon className="w-[18px]" />
					<Typography type="caption">Send tip</Typography>
				</div>
			</div>
		</div>
	);
};
