import * as React from 'react';
import { Images, ImagesType } from 'interfaces';

interface LayoutProps {
	Image: ImagesType;
}

export const LayoutAuth: React.FC<LayoutProps> = ({ Image, children }) => {
	const background = {
		backgroundImage: `url('${Images.circuit}')`,
	} as React.CSSProperties;

	const cover = {
		backgroundImage: `url('${Image}')`,
	} as React.CSSProperties;
	return (
		<div
			className=" min-h-screen bg-secondary flex items-center justify-center py-6"
			style={background}
		>
			<div className="flex max-w-sm m-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl w-full">
				<div className="hidden bg-cover lg:block lg:w-1/2" style={cover}></div>
				<div className="w-full px-6 py-8 md:px-8 lg:w-1/2 bg-white">
					{children}
				</div>
			</div>
		</div>
	);
};
