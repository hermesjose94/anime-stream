import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import clsx from 'clsx';
import { UserType } from 'interfaces';
import { LayoutDashboard } from 'components/layout';
import {
	ChevronDownIcon,
	SearchIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from '@heroicons/react/solid';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

const Categories = () => {
	return (
		<LayoutDashboard title="Categories">
			<div className="my-2 flex sm:flex-row flex-col">
				<div className="flex flex-row mb-1 sm:mb-0">
					<div className="relative">
						<select
							className={clsx(
								'appearance-none h-full rounded-l border-t border-b block w-full bg-white border-gray-200 text-gray-600 py-2 px-4 pr-8 leading-tight',
								' focus:outline-none focus:ring-offset-0 focus:ring-transparent focus:border-gray-200'
							)}
						>
							<option>5</option>
							<option selected>10</option>
							<option>20</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<ChevronDownIcon className="h-4 w-4" />
						</div>
					</div>
					<div className="relative">
						<select
							className={clsx(
								'h-full rounded-r sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-200 text-gray-600 py-2 px-4 pr-8 leading-tight',
								'focus:outline-none focus:ring-offset-0 focus:ring-transparent focus:border-gray-200'
							)}
						>
							<option>All</option>
							<option>Active</option>
							<option>Inactive</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<ChevronDownIcon className="h-4 w-4" />
						</div>
					</div>
				</div>
				<div className="block relative">
					<span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
						<SearchIcon className="h-4 w-4" />
					</span>
					<input
						placeholder="Search"
						className={clsx(
							'appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-200 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-600',
							'focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-primary'
						)}
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<div className="min-w-screen bg-gray-100 flex items-start justify-center overflow-hidden">
					<div className="w-full ">
						<div className="bg-white shadow-md rounded">
							<table className="min-w-max w-full table-auto">
								<thead>
									<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th className="py-3 px-6 text-left">ID</th>
										<th className="py-3 px-6 text-left">Name</th>
										<th className="py-3 px-6 text-center">Cover</th>
										<th className="py-3 px-6 text-center">Status</th>
										<th className="py-3 px-6 text-center">Actions</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-sm font-light">
									<tr className="border-b border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-6 text-left whitespace-nowrap">
											<div className="flex items-center">
												<span className="font-medium">React Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/men/1.jpg"
													/>
												</div>
												<span>Eshal Rosas</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												cover
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-status-success text-status-success-100 py-1 px-3 rounded-full text-xs">
												Active
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
													<EyeIcon className="w-4" />
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
													<PencilIcon className="w-4" />
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
													<TrashIcon className="w-4" />
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<span className="font-medium">Vue Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/women/2.jpg"
													/>
												</div>
												<span>Anita Rodriquez</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												cover
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-status-error text-status-error-100 py-1 px-3 rounded-full text-xs">
												Inactive
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
													<EyeIcon className="w-4" />
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
													<PencilIcon className="w-4" />
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
													<TrashIcon className="w-4" />
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="w-full flex items-center justify-end">
					<nav
						className="my-2 relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<a
							href="#"
							className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</a>
						{/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
						<a
							href="#"
							aria-current="page"
							className="z-10 bg-status-active border-status-active text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
						>
							1
						</a>
						<a
							href="#"
							className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
						>
							2
						</a>
						<a
							href="#"
							className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
						>
							3
						</a>
						<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
							...
						</span>
						<a
							href="#"
							className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
						>
							8
						</a>
						<a
							href="#"
							className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
						>
							9
						</a>
						<a
							href="#"
							className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
						>
							10
						</a>
						<a
							href="#"
							className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</a>
					</nav>
				</div>
			</div>
		</LayoutDashboard>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const user = (session?.user as unknown) as UserType;
	if (session && session.user && user.role !== 'admin') {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
};

export default Categories;
