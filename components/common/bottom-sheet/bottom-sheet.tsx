import * as React from 'react';

export const BottomSheet: React.FC = ({ children }) => {
	React.useEffect(() => {
		const $body = document.getElementsByTagName('body');
		$body[0].style.overflow = 'hidden';
		return () => {
			$body[0].style.overflow = 'auto';
		};
	}, []);
	return (
		<div className="fixed z-10 inset-0">
			<div className="absolute z-10 w-full h-full bg-transparent-color-gray-800"></div>
			<div className="h-30 absolute z-20 bottom-0 left-0 w-full bg-white rounded-t-20 overflow-hidden">
				{children}
			</div>
		</div>
	);
};
