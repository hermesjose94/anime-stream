import { Fragment, SVGProps, useState } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import {
	MenuIcon,
	XIcon,
	HomeIcon,
	ViewGridIcon,
	BookmarkIcon,
	ChipIcon,
	LogoutIcon,
	UserCircleIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Images } from 'interfaces';
import { useRouter } from 'next/router';
import { useUser } from 'hooks/user';
import { Typography } from 'components/common/typography';
import { signout } from 'next-auth/client';

interface NavElemntProps {
	href: string;
	visible?: boolean;
	islogout?: boolean;
}

const NavSidebarElemnt: React.FC<NavElemntProps> = ({
	href,
	visible = true,
	islogout = false,
	children,
}) => {
	const router = useRouter();
	const active = router.pathname === href;
	if (!visible) {
		return null;
	}
	if (islogout) {
		return (
			<div
				onClick={() => {
					signout();
				}}
				className={clsx(
					active
						? 'bg-status-active text-white'
						: 'text-white hover:bg-status-active',
					'group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer'
				)}
			>
				<LogoutIcon
					className="flex-shrink-0 h-6 w-6 text-white"
					aria-hidden="true"
				/>
				<span className="ml-3 text-base font-medium text-white">Logout</span>
			</div>
		);
	}

	return (
		<Link href={href}>
			<a
				className={clsx(
					active
						? 'bg-status-active text-white'
						: 'text-white hover:bg-status-active',
					'group flex items-center px-2 py-2 text-base font-medium rounded-md'
				)}
			>
				{children}
			</a>
		</Link>
	);
};

const NavProfileElemnt: React.FC<NavElemntProps> = ({
	href,
	visible = true,
	islogout = false,
	children,
}) => {
	if (!visible) {
		return null;
	}
	if (islogout) {
		return (
			<div
				className="p-4 flex items-center group hover:bg-status-active cursor-pointer"
				onClick={() => {
					signout();
				}}
			>
				<LogoutIcon
					className={clsx(
						'flex-shrink-0 h-6 w-6 text-secondary',
						'group-hover:text-white'
					)}
					aria-hidden="true"
				/>
				<span className="ml-3 text-base font-medium text-white">Logout</span>
			</div>
		);
	}
	return (
		<Link href={href}>
			<a className="p-4 flex items-center group hover:bg-status-active">
				{children}
			</a>
		</Link>
	);
};

const NavElement: React.FC<NavElemntProps> = ({
	href,
	visible = true,
	children,
}) => {
	const router = useRouter();
	const active = router.pathname === href;
	if (!visible) {
		return null;
	}
	return (
		<Link href={href}>
			<a
				className={clsx(
					'text-base font-normal cursor-pointer h-14 px-5 text-white flex items-center justify-center',
					{ 'bg-status-active': active },
					{ 'border-gray-900': !active },
					'hover:bg-status-active'
				)}
			>
				{children}
			</a>
		</Link>
	);
};

const background = {
	background:
		'linear-gradient(45deg,var(--color-secondary),var(--color-primary))',
} as React.CSSProperties;

const navElements = [
	{
		name: 'Home',
		href: '/',
		icon: HomeIcon,
		sesion: false,
	},
	{
		name: 'Explorer',
		href: '/dashboard',
		icon: ViewGridIcon,
		sesion: false,
	},
	{
		name: 'My Lists',
		href: '/dashboard',
		icon: BookmarkIcon,
		sesion: true,
	},
];

const navProfile = [
	{
		name: 'Profile',
		href: '/profile',
		icon: UserCircleIcon,
		admin: false,
	},
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: ChipIcon,
		admin: true,
	},
];

export const Header = () => {
	const { user } = useUser();
	const [sidebarProfileOpen, setSidebarProfileOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const defaultAvatar = user
		? user.avatar === 'avatar.png'
			? Images.avatar
			: user.avatar
		: Images.avatar;

	// const defaultAvatar = Images.avatar;

	return (
		<>
			{/* sidebar menu mobile */}
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed inset-0 flex z-40 lg:hidden"
					open={sidebarOpen}
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-transparent-600" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div
							className="relative flex-1 flex flex-col  w-full md:max-w-xs"
							style={background}
						>
							<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
								<div className="flex-shrink-0 flex items-center justify-between px-4">
									<Link href="/">
										<a
											className={clsx(
												'cursor-pointer flex items-center justify-center'
											)}
										>
											<Image
												width={104}
												height={32}
												src={Images.logo}
												className={'h-8 w-auto sm:h-10'}
											/>
										</a>
									</Link>
									<button
										className="ml-1 flex items-center justify-center h-8 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
								<nav className="mt-5 px-2 space-y-1">
									{navElements.map((item, i) => {
										return (
											<NavSidebarElemnt
												key={`navMobile-${i}`}
												href={item.href}
												visible={item.sesion ? (user ? true : false) : true}
											>
												<item.icon
													className="mr-4 flex-shrink-0 h-6 w-6 text-white"
													aria-hidden="true"
												/>
												{item.name}
											</NavSidebarElemnt>
										);
									})}
									{navProfile.map((item, i) => {
										return (
											<NavSidebarElemnt
												key={`profileMobile-${i}`}
												href={item.href}
												visible={
													user
														? item.admin
															? user.role === 'admin'
																? true
																: false
															: true
														: false
												}
											>
												<item.icon
													className="mr-4 flex-shrink-0 h-6 w-6 text-white"
													aria-hidden="true"
												/>
												{item.name}
											</NavSidebarElemnt>
										);
									})}
									<NavSidebarElemnt href="#" visible={!!user} islogout />
								</nav>
							</div>
							<div className="flex-shrink-0 flex border-t border-white p-4">
								{user ? (
									<>
										<div className="flex items-center">
											<div
												className={clsx(
													' bg-white inline-flex items-center w-10 h-10 overflow-hidden border border-gray-400 rounded-full'
												)}
											>
												<Image
													width={40}
													height={40}
													src={defaultAvatar}
													className={'object-cover w-10 h-10'}
												/>
											</div>
											<div className="ml-3">
												<Typography
													type="text-base"
													className="text-white font-semibold"
												>
													{user?.username}
												</Typography>
												<Typography type="caption" className="text-white">
													{user.email}
												</Typography>
											</div>
										</div>
									</>
								) : (
									<div className="flex items-center justify-center w-full">
										<Link href="/auth/signin">
											<a
												className={clsx(
													'whitespace-nowrap text-base font-medium text-white',
													'hover:text-status-active'
												)}
											>
												Sign in
											</a>
										</Link>
										<Link href="/auth/signup">
											<a
												className={clsx(
													'ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-status-active rounded-md shadow-sm text-base font-medium text-white bg-status-active',
													'hover:bg-white hover:text-status-active'
												)}
											>
												Sign up
											</a>
										</Link>
									</div>
								)}
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
			{/* sidebar menu mobile */}

			{/* sidebar menu profile */}
			<Transition.Root show={sidebarProfileOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed inset-0 z-40 justify-end hidden md:flex"
					open={sidebarProfileOpen}
					onClose={setSidebarProfileOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-transparent-600" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="translate-x-full"
						enterTo="-translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="-translate-x-0"
						leaveTo="translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full bg-secondary">
							<div className="flex-1 h-0 pb-4 overflow-y-auto">
								<div
									className="relative text-white p-6 flex items-center justify-center flex-col pl-1 pr-3 py-1 sm:pl-3 sm:py-3"
									style={background}
								>
									<div
										className={clsx(
											'  inline-flex items-center w-20 h-20 overflow-hidden border-2 border-gray-400 rounded-full'
										)}
									>
										<Image
											width={80}
											height={80}
											src={defaultAvatar}
											className={'object-cover w-20 h-20'}
										/>
									</div>
									<Typography type="text-base" className="mt-2">
										{user?.fullname}
									</Typography>
									<Typography type="text-base" className="mt-2">
										{user?.email}
									</Typography>
								</div>
								<nav className="space-y-1">
									{navProfile.map((item, i) => {
										return (
											<NavProfileElemnt
												key={`profileMobile-${i}`}
												href={item.href}
												visible={
													user
														? item.admin
															? user.role === 'admin'
																? true
																: false
															: true
														: false
												}
											>
												<item.icon
													className={clsx(
														'flex-shrink-0 h-6 w-6 text-secondary',
														'group-hover:text-white'
													)}
													aria-hidden="true"
												/>
												<span className="ml-3 text-base font-medium text-white">
													{item.name}
												</span>
											</NavProfileElemnt>
										);
									})}
									<NavProfileElemnt href="#" islogout />
								</nav>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
			{/* sidebar menu profile */}

			{/* navbar desktop */}
			<div className="relative w-full bg-gradient-to-r from-secondary to-primary">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex justify-between items-center md:justify-start md:space-x-10">
						<button
							className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md md:hidden text-white hover:text-status-active focus:outline-none"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</button>
						<div className="flex justify-start">
							<Link href="/">
								<a
									className={clsx(
										'cursor-pointer flex items-center justify-center'
									)}
								>
									<Image
										width={110}
										height={38}
										src={Images.logo}
										className={'h-8 w-auto sm:h-10'}
									/>
								</a>
							</Link>
						</div>
						<nav className="hidden md:flex ">
							{navElements.map((item, i) => {
								return (
									<NavElement
										key={`navElement-${i}`}
										href={item.href}
										visible={item.sesion ? (user ? true : false) : true}
									>
										<item.icon
											className="mr-4 flex-shrink-0 h-6 w-6 text-white"
											aria-hidden="true"
										/>
										{item.name}
									</NavElement>
								);
							})}
						</nav>
						<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
							{user ? (
								<>
									<button
										className="flex justify-center items-center focus:outline-none group cursor-pointer"
										onClick={() => setSidebarProfileOpen(true)}
									>
										<div
											className={clsx(
												' bg-white inline-flex items-center w-9 h-9 overflow-hidden border-2 border-gray-400 rounded-full'
											)}
										>
											<Image
												width={36}
												height={36}
												src={defaultAvatar}
												className={'object-cover w-9 h-9'}
											/>
										</div>
										<Typography
											type="text-base"
											className={clsx(
												'ml-2 text-white',
												'group-hover:text-status-active'
											)}
										>
											{user.username}
										</Typography>
									</button>
								</>
							) : (
								<>
									<Link href="/auth/signin">
										<a
											className={clsx(
												'whitespace-nowrap text-base font-medium text-white',
												'hover:text-status-active'
											)}
										>
											Sign in
										</a>
									</Link>
									<Link href="/auth/signup">
										<a
											className={clsx(
												'ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-status-active rounded-md shadow-sm text-base font-medium text-white bg-status-active',
												'hover:bg-white hover:text-status-active hover:border-white'
											)}
										>
											Sign up
										</a>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* navbar desktop */}
		</>
	);
};
