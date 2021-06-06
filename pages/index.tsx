import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signout } from 'next-auth/client';
// import cookies from 'js-cookie';
import { Typography } from 'components/common/typography';
import { useUser } from 'hooks/user';
import { Layout } from 'components/layout';
import { Logo } from 'components/logo';
// import Image from 'next/image';
import { Button } from 'components/common/button';
import { LogoutIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
// import Skeleton from 'react-loading-skeleton';

const Home = () => {
	const { user } = useUser();

	return (
		<Layout withHeader>
			<div className="center flex flex-col items-center justify-center px-14 py-5 w-full">
				<Logo className="mb-4" />
				<div className="mb-11 w-full">
					{user ? (
						<>
							<Typography type="title" className="mb-5">
								{user?.fullname}
							</Typography>
							<Typography
								type="sub-title"
								className="mt-2 flex justify-between"
							>
								<strong>Username: </strong>
								{user?.username}
							</Typography>
							<Typography
								type="sub-title"
								className="mt-2 flex justify-between"
							>
								<strong>Email: </strong>
								{user?.email}
							</Typography>
							<Typography
								type="sub-title"
								className="mt-2 flex justify-between"
							>
								<strong>Full Name: </strong>
								{user?.fullname}
							</Typography>
							<Typography
								type="sub-title"
								className="mt-2 flex justify-between"
							>
								<strong>Role: </strong>
								{user?.role}
							</Typography>
						</>
					) : (
						<div className="w-full flex-col flex justify-center items-center">
							{/* <div
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
							</div> */}
							<Typography type="title">Construccion...</Typography>
						</div>
					)}
					{/* <Image
						src="https://res.cloudinary.com/dahv3c3dr/image/upload/v1622772144/sample.jpg"
						alt="Galaxy"
						width={1000}
						height={750}
					/>

					<Image
						src="https://lh3.googleusercontent.com/pw/ACtC-3eYvhJHHmRO7fSdYhuU37tn9wbnxpB3J8Lg8BE6X8tLLB3AZ-RuCL_5KrFdMmyN3oFeoTT-a6PTB9vbkZP9WtSCxgXsP5GJ6BNvzE1hRCt4Wgua96SbMCEiWfpLITxgPTalM_ViPqITVbc44vPVNoIcEw=w672-h372-no?authuser=0"
						alt="Galaxy"
						width={1000}
						height={750}
					/> */}
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	return {
		props: { session },
	};
};

export default Home;
