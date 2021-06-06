import * as React from 'react';
import { HomeIcon } from '@heroicons/react/solid';
import { SearchIcon, PlusCircleIcon, ChatIcon } from '@heroicons/react/outline';
import { Avatar } from 'components/common/avatar';

export const Footer = () => {
	return (
		<footer className="h-[52px] w-full fixed bottom-0 z-20 left-0 right-0 bg-white flex">
			<ul className="w-full grid gap-11 grid-flow-col justify-center items-center">
				<li className="cursor-pointer">
					<HomeIcon className="w-6" />
				</li>
				<li className="cursor-pointer">
					<SearchIcon className="w-6" />
				</li>
				<li className="cursor-pointer">
					<PlusCircleIcon className="w-6" />
				</li>
				<li className="cursor-pointer">
					<ChatIcon className="w-6" />
				</li>
				<li className="cursor-pointer">
					<Avatar size="small" />
				</li>
			</ul>
		</footer>
	);
};
