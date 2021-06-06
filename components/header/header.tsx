import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
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

const background = {
	background:
		'linear-gradient(45deg,var(--color-secondary),var(--color-primary))',
} as React.CSSProperties;

export const Header = () => {
	const { user } = useUser();

	const defaultAvatar = user
		? user.avatar === 'avatar.png'
			? Images.avatar
			: user.avatar
		: Images.avatar;

	// const defaultAvatar = Images.avatar;

	return (
		<Popover className="relative w-full bg-gradient-to-r from-secondary to-primary">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6">
						<div className="flex justify-between items-center md:justify-start md:space-x-10">
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
							<div className="-mr-2 -my-2 md:hidden">
								<Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-active focus:outline-none">
									<span className="sr-only">Open menu</span>
									<MenuIcon className="h-6 w-6" aria-hidden="true" />
								</Popover.Button>
							</div>
							<Popover.Group as="nav" className="hidden md:flex ">
								{navElements.map((item, i) => {
									const router = useRouter();
									const active = router.pathname === item.href;
									if (!item.sesion) {
										return (
											<Link href={item.href} key={`nav-${item.name}-${i}`}>
												<a
													className={clsx(
														'text-base font-normal cursor-pointer h-14 px-5 text-white flex items-center justify-center',
														{ 'bg-active': active },
														{ 'border-gray-900': !active },
														'hover:bg-active'
													)}
												>
													<item.icon
														className="flex-shrink-0 h-6 w-6 text-indigo-600"
														aria-hidden="true"
													/>
													<span className="ml-2 text-base font-medium text-white">
														{item.name}
													</span>
												</a>
											</Link>
										);
									}
									if (item.sesion && user) {
										return (
											<Link href={item.href} key={`nav-${item.name}-${i}`}>
												<a
													className={clsx(
														'text-base font-normal cursor-pointer h-14 px-5 text-white flex items-center justify-center',
														{ 'bg-active': active },
														{ 'border-gray-900': !active },
														'hover:bg-active'
													)}
												>
													<item.icon
														className="flex-shrink-0 h-6 w-6 text-indigo-600"
														aria-hidden="true"
													/>
													<span className="ml-2 text-base font-medium text-white">
														{item.name}
													</span>
												</a>
											</Link>
										);
									}
								})}
							</Popover.Group>
							<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
								{user ? (
									<Popover.Group>
										<Popover className="relative">
											{({ open }) => (
												<>
													<Popover.Button className="flex justify-center items-center focus:outline-none group">
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
																'group-hover:text-active'
															)}
														>
															{user.username}
														</Typography>
													</Popover.Button>
													<Transition
														show={open}
														as={Fragment}
														enter="transition ease-out duration-200"
														enterFrom="opacity-0 translate-y-1"
														enterTo="opacity-100 translate-y-0"
														leave="transition ease-in duration-150"
														leaveFrom="opacity-100 translate-y-0"
														leaveTo="opacity-0 translate-y-1"
													>
														<Popover.Panel
															static
															//
															className={clsx(
																'absolute z-10 -ml-4 mt-2 transform w-screen max-w-xs lg:left-1/2 lg:-translate-x-2/3'
															)}
														>
															<div className="rounded-sm bg-secondary overflow-hidden">
																<div
																	className="relative text-white p-6 flex items-center justify-center flex-col"
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
																		{user.fullname}
																	</Typography>
																	<Typography type="text-base" className="mt-2">
																		{user.email}
																	</Typography>
																</div>
																{navProfile.map((item, i) => {
																	if (!item.admin)
																		return (
																			<Link
																				href={item.href}
																				key={`navProfile-${item.name}-${i}`}
																			>
																				<a className="p-4 flex items-center group hover:bg-active">
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
																				</a>
																			</Link>
																		);
																	if (item.admin && user.role === 'admin')
																		return (
																			<Link
																				href={item.href}
																				key={`navProfile-${item.name}-${i}`}
																			>
																				<a className="p-4 flex items-center group hover:bg-active">
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
																				</a>
																			</Link>
																		);
																})}
																<div
																	className="p-4 flex items-center group hover:bg-active cursor-pointer"
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
																	<span className="ml-3 text-base font-medium text-white">
																		Logout
																	</span>
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</>
											)}
										</Popover>
									</Popover.Group>
								) : (
									<>
										<Link href="/auth/signin">
											<a
												className={clsx(
													'whitespace-nowrap text-base font-medium text-white',
													'hover:text-active'
												)}
											>
												Sign in
											</a>
										</Link>
										<Link href="/auth/signup">
											<a
												className={clsx(
													'ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-active',
													'hover:bg-white hover:text-active'
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

					<Transition
						show={open}
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							static
							className="z-10 absolute top-0 inset-x-0 transition transform origin-top-right md:hidden min-h-screen h-screen"
						>
							<div className="min-h-screen h-screen bg-secondary flex items-start justify-between flex-col">
								<div className="pt-5 pb-6 px-5 w-full">
									<div className="flex items-center justify-between w-full">
										<div>
											<Image
												width={110}
												height={38}
												src={defaultAvatar}
												className={'h-8 w-auto sm:h-10'}
											/>
										</div>
										<div className="-mr-2">
											<Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-active  focus:outline-none">
												<span className="sr-only">Close menu</span>
												<XIcon className="h-6 w-6" aria-hidden="true" />
											</Popover.Button>
										</div>
									</div>
									<div className="mt-6">
										<nav className="grid gap-y-8">
											{navElements.map((item, i) => {
												if (!item.sesion) {
													return (
														<Link
															href={item.href}
															key={`mobilNav-${item.name}-${i}`}
														>
															<a className="-m-3 p-3 flex items-center rounded-md hover:bg-active">
																<item.icon
																	className="flex-shrink-0 h-6 w-6 text-white"
																	aria-hidden="true"
																/>
																<span className="ml-3 text-base font-medium text-white">
																	{item.name}
																</span>
															</a>
														</Link>
													);
												}
												if (item.sesion && user) {
													return (
														<Link
															href={item.href}
															key={`mobilNav-${item.name}-${i}`}
														>
															<a className="-m-3 p-3 flex items-center rounded-md hover:bg-active">
																<item.icon
																	className="flex-shrink-0 h-6 w-6 text-white"
																	aria-hidden="true"
																/>
																<span className="ml-3 text-base font-medium text-white">
																	{item.name}
																</span>
															</a>
														</Link>
													);
												}
											})}
											{user &&
												navProfile.map((item, i) => {
													if (!item.admin) {
														return (
															<Link
																href={item.href}
																key={`mobilNavProfile-${item.name}-${i}`}
															>
																<a className="-m-3 p-3 flex items-center rounded-md hover:bg-active">
																	<item.icon
																		className="flex-shrink-0 h-6 w-6 text-white"
																		aria-hidden="true"
																	/>
																	<span className="ml-3 text-base font-medium text-white">
																		{item.name}
																	</span>
																</a>
															</Link>
														);
													}
													if (item.admin && user) {
														return (
															<Link
																href={item.href}
																key={`mobilNavProfile-${item.name}-${i}`}
															>
																<a className="-m-3 p-3 flex items-center rounded-md hover:bg-active">
																	<item.icon
																		className="flex-shrink-0 h-6 w-6 text-white"
																		aria-hidden="true"
																	/>
																	<span className="ml-3 text-base font-medium text-white">
																		{item.name}
																	</span>
																</a>
															</Link>
														);
													}
												})}
											{user && (
												<div
													className="-m-3 p-3 flex items-center rounded-md hover:bg-active cursor-pointer"
													onClick={() => {
														signout();
													}}
												>
													<LogoutIcon
														className="flex-shrink-0 h-6 w-6 text-white"
														aria-hidden="true"
													/>
													<span className="ml-3 text-base font-medium text-white">
														Logout
													</span>
												</div>
											)}
										</nav>
									</div>
								</div>
								{user ? (
									<div className="py-6 px-5 flex flex-col items-start justify-center w-full">
										<div className="w-full border-t border-gray-50 my-6" />
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
									</div>
								) : (
									<div className="py-6 px-5 flex items-center justify-center w-full">
										<Link href="/auth/signin">
											<a
												className={clsx(
													'whitespace-nowrap text-base font-medium text-white',
													'hover:text-active'
												)}
											>
												Sign in
											</a>
										</Link>
										<Link href="/auth/signup">
											<a
												className={clsx(
													'ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-active',
													'hover:bg-white hover:text-active'
												)}
											>
												Sign up
											</a>
										</Link>
									</div>
								)}
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
