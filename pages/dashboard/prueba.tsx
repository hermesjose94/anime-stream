import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { UserType } from 'interfaces';
import { LayoutDashboard } from 'components/layout';
import { useQuery } from 'react-query';
import { getPrueba } from 'api';
import { SearchIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { PruebaType } from 'interfaces/prueba';

const Prueba = () => {
	const { data, isLoading } = useQuery(['GET_PRUEBA'], () => getPrueba(), {
		keepPreviousData: true,
	});
	const [dataTable, setDataTable] = React.useState<PruebaType[]>();
	const [directionOrder, setDirectionOrder] = React.useState(1);
	const search = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		setDataTable(data);
		console.log('mirar');
	}, [data]);

	const handleSearch = () => {
		if (dataTable && search.current) {
			const val = search.current.value;
			if (val) {
				let filter = dataTable.filter((item) => {
					return (
						item.location.city.includes(val) ||
						item.location.state.includes(val) ||
						item.location.country.includes(val) ||
						`${item.location.postcode}`.includes(val) ||
						`${item.location.street.number}`.includes(val) ||
						`${item.name.title} ${item.name.first} ${item.name.last}`.includes(
							val
						) ||
						item.location.coordinates.latitude.includes(val) ||
						item.location.coordinates.longitude.includes(val)
					);
				});
				setDataTable(filter);
			} else {
				setDataTable(data);
			}
		}
	};

	const orderColumn = (column: string) => {
		if (data) {
			let order;
			if (column === 'city') {
				console.log('1');
				order = data.sort(function (a, b) {
					if (a.location.city > b.location.city) {
						return 1;
					}
					if (a.location.city < b.location.city) {
						return -1;
					}

					return 0;
				});
			}
			if (column === 'state') {
				console.log('2');
				order = data.sort(function (a, b) {
					if (a.location.state > b.location.state) {
						return 1;
					}
					if (a.location.state < b.location.state) {
						return -1;
					}
					return 0;
				});
			}
			if (column === 'country') {
				console.log('3');
				order = data.sort(function (a, b) {
					if (a.location.country > b.location.country) {
						return 1;
					}
					if (a.location.country < b.location.country) {
						return -1;
					}
					return 0;
				});
			}

			if (column === 'postcode') {
				console.log('4');
				order = data.sort(function (a, b) {
					if (a.location.postcode > b.location.postcode) {
						return 1;
					}
					if (a.location.postcode < b.location.postcode) {
						return -1;
					}
					return 0;
				});
			}
			if (column === 'number') {
				console.log('5');
				order = data.sort(function (a, b) {
					if (a.location.street.number > b.location.street.number) {
						return 1;
					}
					if (a.location.street.number < b.location.street.number) {
						return -1;
					}
					return 0;
				});
			}
			if (column === 'name') {
				console.log('6');
				order = data.sort(function (a, b) {
					if (
						`${a.name.title} ${a.name.first} ${a.name.last}` >
						`${b.name.title} ${b.name.first} ${b.name.last}`
					) {
						return 1;
					}
					if (
						`${a.name.title} ${a.name.first} ${a.name.last}` <
						`${b.name.title} ${b.name.first} ${b.name.last}`
					) {
						return -1;
					}
					return 0;
				});
			}
			if (column === 'latitude') {
				console.log('7');
				order = data.sort(function (a, b) {
					if (
						a.location.coordinates.latitude > b.location.coordinates.latitude
					) {
						return 1;
					}
					if (
						a.location.coordinates.latitude < b.location.coordinates.latitude
					) {
						return -1;
					}
					return 0;
				});
			}
			if (column === 'longitude') {
				console.log('8');
				order = data.sort(function (a, b) {
					if (
						a.location.coordinates.longitude > b.location.coordinates.longitude
					) {
						return 1;
					}
					if (
						a.location.coordinates.longitude < b.location.coordinates.longitude
					) {
						return -1;
					}
					return 0;
				});
			}
			console.log(order);

			setDataTable(order);
		}
	};

	React.useEffect(() => {
		console.log('cambio');
	}, [dataTable]);

	return (
		<LayoutDashboard title="Prueba" isLoading={isLoading}>
			<>
				<div className="my-2 flex sm:flex-row flex-col">
					<div className="flex flex-row mb-1 sm:mb-0">
						<div className="block relative">
							<span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
								<SearchIcon className="h-4 w-4" />
							</span>
							<input
								onChange={handleSearch}
								placeholder="Search"
								ref={search}
								className={clsx(
									'appearance-none sm:rounded-l-none border border-gray-200 block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-600',
									'focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-primary'
								)}
							/>
						</div>
					</div>
				</div>
				<div className="w-full overflow-hidden overflow-x-scroll hide-scroll-bar">
					<table className="min-w-max w-full table-auto">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th
									onClick={() => {
										orderColumn('city');
									}}
									className="py-3 px-6 text-left cursor-pointer"
								>
									City
								</th>
								<th
									onClick={() => {
										orderColumn('state');
									}}
									className="py-3 px-6 text-left cursor-pointer"
								>
									State
								</th>
								<th
									onClick={() => {
										orderColumn('country');
									}}
									className="py-3 px-6 text-center cursor-pointer"
								>
									Country
								</th>
								<th
									onClick={() => {
										orderColumn('postcode');
									}}
									className="py-3 px-6 text-center cursor-pointer"
								>
									Postcode
								</th>
								<th
									onClick={() => {
										orderColumn('number');
									}}
									className="py-3 px-6 text-center cursor-pointer"
								>
									Number
								</th>

								<th
									onClick={() => {
										orderColumn('name');
									}}
									className="py-3 px-6 text-center cursor-pointer"
								>
									Name
								</th>
								<th
									onClick={() => {
										orderColumn('latitude');
									}}
									className="py-3 px-6 text-center cursor-pointer"
								>
									Latitude
								</th>
								<th
									onClick={() => {
										orderColumn('longitude');
									}}
									className="py-3 px-6 text-center cursor-pointer"
								>
									Longitude
								</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{dataTable &&
								dataTable.map((item, i) => {
									return (
										<tr
											key={`item-${i}`}
											className="border-b border-l-2 border-r-2 border-gray-200 hover:bg-gray-100"
										>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.city}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.state}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.country}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.postcode}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.street.number}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{`${item.name.title} ${item.name.first} ${item.name.last}`}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.coordinates.latitude}</span>
													</div>
												</div>
											</td>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<span>{item.location.coordinates.longitude}</span>
													</div>
												</div>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</>
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

export default Prueba;
