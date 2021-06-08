import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import clsx from 'clsx';
import { Images, PaginationType, UserType } from 'interfaces';
import { LayoutDashboard } from 'components/layout';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useQuery } from 'react-query';
import { getUsers, GET_USERS } from 'api';
import { useUser } from 'hooks/user';
import Image from 'next/image';
import Pagination from 'components/pagination/pagination';

const Categories = () => {
	const { token } = useUser();
	const { data: users } = useQuery<UserType[]>(GET_USERS, () =>
		getUsers(token)
	);

	const onPageChanged = (data: PaginationType) => {
		console.log({ data });
	};

	return (
		<LayoutDashboard title="Users">
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
							<option>Admin</option>
							<option>User</option>
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
										<th className="py-3 px-6 text-left">Username</th>
										<th className="py-3 px-6 text-left">Rol</th>
										<th className="py-3 px-6 text-center">Email</th>
										<th className="py-3 px-6 text-center">Fullname</th>
										<th className="py-3 px-6 text-center">Actions</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-sm font-light">
									{users &&
										users.map((user) => {
											const defaultAvatar = user
												? user.avatar === 'avatar.png'
													? Images.avatar
													: user.avatar
												: Images.avatar;
											return (
												<tr
													key={`user-${user.id}`}
													className="border-b border-gray-200 hover:bg-gray-100"
												>
													<td className="py-3 px-6 text-left whitespace-nowrap">
														<div className="flex items-center justify-between">
															<div className="flex items-center">
																<div
																	className={clsx(
																		'inline-flex items-center w-6 h-6 overflow-hidden rounded-full mr-2'
																	)}
																>
																	<Image
																		width={24}
																		height={24}
																		src={defaultAvatar}
																		className={'object-cover w-6 h-6'}
																	/>
																</div>
																<span>{user.username}</span>
															</div>
														</div>
													</td>
													<td className="py-3 px-6 text-left">
														<span
															className={clsx(
																'py-1 px-3 rounded-full text-xs',
																{
																	'bg-status-success text-status-success-100':
																		user.role === 'user',
																},
																{
																	'bg-status-complete text-status-complete-100':
																		user.role === 'admin',
																}
															)}
														>
															{user.role}
														</span>
													</td>
													<td className="py-3 px-6 text-left">
														<div className="flex items-center">
															<span>{user.email}</span>
														</div>
													</td>
													<td className="py-3 px-6 text-center">
														<div className="flex items-center justify-center">
															<span>{user.fullname}</span>
														</div>
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
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="w-full flex items-center justify-end">
					<Pagination totalRecords={100} onPageChanged={onPageChanged} />
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
