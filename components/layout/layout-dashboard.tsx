import { Fragment, useState } from 'react';
import { useUser } from 'hooks/user';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {
	CalendarIcon,
	FolderIcon,
	HomeIcon,
	InboxIcon,
	MenuIcon,
	UsersIcon,
	BookOpenIcon,
	XIcon,
} from '@heroicons/react/outline';
import { Images } from 'interfaces';
import { Typography } from 'components/common/typography';
import { Loading } from 'components/loading';
import { Back } from 'components/common/back';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
	{ name: 'Users', href: '/dashboard/users', icon: UsersIcon },
	{ name: 'Animes', href: '/dashboard/animes', icon: FolderIcon },
	{ name: 'Seasons', href: '/dashboard/seasons', icon: CalendarIcon },
	{ name: 'Categories', href: '/dashboard/categories', icon: InboxIcon },
	{ name: 'Guide Styles', href: '/dashboard/guide-styles', icon: BookOpenIcon },
];
interface LayoutDashboardProps {
	title: string;
	isLoading?: boolean;
	showBack?: boolean;
}
export const LayoutDashboard: React.FC<LayoutDashboardProps> = ({
	title,
	isLoading = false,
	showBack = false,
	children,
}) => {
	const { user, isLoading: loadingUser } = useUser();
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const defaultAvatar = user
		? user.avatar === 'avatar.png'
			? Images.avatar
			: user.avatar
		: Images.avatar;

	const background = {
		background:
			'linear-gradient(45deg,var(--color-secondary),var(--color-primary))',
	} as React.CSSProperties;

	if (isLoading || loadingUser) {
		return <Loading />;
	}

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
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
							<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto hide-scroll-bar">
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
									{navigation.map((item) => {
										const active = router.pathname === item.href;
										return (
											<Link key={item.name} href={item.href}>
												<a
													className={clsx(
														active
															? 'bg-status-active text-white'
															: 'text-white hover:bg-status-active',
														'group flex items-center px-2 py-2 text-base font-medium rounded-md'
													)}
												>
													<item.icon
														className="mr-4 flex-shrink-0 h-6 w-6 text-white"
														aria-hidden="true"
													/>
													{item.name}
												</a>
											</Link>
										);
									})}
								</nav>
							</div>
							<div className="flex-shrink-0 flex border-t border-white p-4">
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
											{user?.email}
										</Typography>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>

			<div className="hidden lg:flex lg:flex-shrink-0" style={background}>
				<div className="flex flex-col w-64">
					<div className="flex flex-col h-0 flex-1">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto hide-scroll-bar">
							<div className="flex items-center flex-shrink-0 px-4">
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
							<nav className="mt-5 flex-1 px-2 space-y-1">
								{navigation.map((item) => {
									const active = router.pathname === item.href;
									return (
										<Link key={item.name} href={item.href}>
											<a
												className={clsx(
													active
														? 'bg-status-active text-white'
														: 'text-white hover:bg-status-active',
													'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
												)}
											>
												<item.icon
													className="mr-3 flex-shrink-0 h-6 w-6 text-white"
													aria-hidden="true"
												/>
												{item.name}
											</a>
										</Link>
									);
								})}
							</nav>
						</div>
						<div className="flex-shrink-0 flex border-t border-white p-4">
							<a href="#" className="flex-shrink-0 w-full group block">
								<div className="flex items-center">
									<div
										className={clsx(
											' bg-white inline-flex items-center w-9 h-9 overflow-hidden border border-gray-400 rounded-full'
										)}
									>
										<Image
											width={36}
											height={36}
											src={defaultAvatar}
											className={'object-cover w-9 h-9'}
										/>
									</div>
									<div className="ml-3">
										<Typography
											type="text-base"
											className="text-white font-semibold"
										>
											{user?.username}
										</Typography>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-0 flex-1 overflow-hidden">
				<div
					className="lg:hidden pl-1 pr-3 py-1 sm:pl-3 sm:py-3 flex items-center justify-between"
					style={background}
				>
					<button
						className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-white hover:text-status-active focus:outline-none"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<MenuIcon className="h-6 w-6" aria-hidden="true" />
					</button>
					<div className={'h-8 w-auto sm:h-10'}>
						<Image width={110} height={32} src={Images.logo} />
					</div>
				</div>
				<main className="flex-1 relative z-0 overflow-y-auto hide-scroll-bar focus:outline-none">
					<div className="py-6">
						<div className="max-w-7xl mx-auto px-4 flex items-center justify-start sm:px-6 md:px-8">
							{showBack && <Back />}
							<h1 className="text-2xl font-semibold">{title}</h1>
						</div>
						<div className="rounded-lg m-4 p-4 sm:p-6 md:p-8 bg-white">
							{children}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
