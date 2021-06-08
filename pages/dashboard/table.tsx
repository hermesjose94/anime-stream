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

const Tables = () => {
	return (
		<LayoutDashboard title="Tables">
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
												<div className="mr-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														x="0px"
														y="0px"
														width="24"
														height="24"
														viewBox="0 0 48 48"
														// style=" fill:#000000;"
													>
														<path
															fill="#80deea"
															d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
														></path>
														<path
															fill="#80deea"
															d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
														></path>
														<path
															fill="#80deea"
															d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
														></path>
														<circle
															cx="24"
															cy="24"
															r="4"
															fill="#80deea"
														></circle>
													</svg>
												</div>
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
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
												Active
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://img.icons8.com/color/100/000000/vue-js.png"
													/>
												</div>
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
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
												Completed
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://img.icons8.com/color/100/000000/angularjs.png"
													/>
												</div>
												<span className="font-medium">Angular Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/men/3.jpg"
													/>
												</div>
												<span>Taylan Bush</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
												Scheduled
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/laravel-64.png"
													/>
												</div>
												<span className="font-medium">Laravel Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/men/4.jpg"
													/>
												</div>
												<span>Tarik Novak</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
												Pending
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://img.icons8.com/color/48/000000/git.png"
													/>
												</div>
												<span className="font-medium">GIT Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/men/5.jpg"
													/>
												</div>
												<span>Oscar Howard</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
												Active
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://img.icons8.com/color/48/000000/nodejs.png"
													/>
												</div>
												<span className="font-medium">NodeJS Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/women/6.jpg"
													/>
												</div>
												<span>Melisa Moon</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
												Scheduled
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://img.icons8.com/color/48/000000/javascript.png"
													/>
												</div>
												<span className="font-medium">JavaScript Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/women/7.jpg"
													/>
												</div>
												<span>Cora Key</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
												Pending
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</div>
											</div>
										</td>
									</tr>
									<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6"
														src="https://img.icons8.com/color/48/000000/php.png"
													/>
												</div>
												<span className="font-medium">PHP Project</span>
											</div>
										</td>
										<td className="py-3 px-6 text-left">
											<div className="flex items-center">
												<div className="mr-2">
													<img
														className="w-6 h-6 rounded-full"
														src="https://randomuser.me/api/portraits/men/8.jpg"
													/>
												</div>
												<span>Kylan Dorsey</span>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex items-center justify-center">
												<img
													className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/1.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/women/2.jpg"
												/>
												<img
													className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
													src="https://randomuser.me/api/portraits/men/3.jpg"
												/>
											</div>
										</td>
										<td className="py-3 px-6 text-center">
											<span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
												Completed
											</span>
										</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
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
							className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
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

export default Tables;
