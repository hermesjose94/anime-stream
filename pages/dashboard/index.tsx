import { useUser } from 'hooks/user';
import { LayoutDashboard } from 'components/layout';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { UserType } from 'interfaces';

const Dashboard = () => {
	return (
		<LayoutDashboard title="Dashboard">
			<div className="py-4">
				<div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
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

export default Dashboard;
