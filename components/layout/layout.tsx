import * as React from 'react';
import clsx from 'clsx';
import { Header } from 'components/header';
import { Footer } from 'components/footer';
import { Loading } from 'components/loading';

interface LayoutProps {
	withFooter?: boolean;
	withHeader?: boolean;
	isLoading?: boolean;
}

/**
 * Component use to wrap all pages with a header and a footer (if necessary)
 */
export const Layout: React.FC<LayoutProps> = ({
	children,
	withHeader = false,
	withFooter = false,
	isLoading = false,
}) => {
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div
			className={clsx('grid place-items-start w-full min-h-screen bg-white ')}
			style={{ gridTemplateRows: '85px 1fr 52px' }}
		>
			{withHeader && <Header />}
			{children}
			{withFooter && (
				<div className="self-end w-full">
					<Footer />
				</div>
			)}
		</div>
	);
};
