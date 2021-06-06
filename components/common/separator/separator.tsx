import * as React from 'react';
import { Typography } from '../typography';

export interface SeparatorProps {
	text?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
	text = 'or',
	children,
}) => {
	return (
		<>
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<div className="w-full border-t border-gray-400" />
				</div>
				<div className="relative flex justify-center">
					<Typography
						type="sub-title-small"
						className="text-center text-gray-400 px-6 bg-white text-sm"
					>
						{children || text}
					</Typography>
				</div>
			</div>
		</>
	);
};
