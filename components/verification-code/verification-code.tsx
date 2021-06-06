import * as React from 'react';
import { Button } from 'components/common/button';
import { Typography } from 'components/common/typography';
import clsx from 'clsx';

type VerificationCodeProps = {
	resendCode: () => void;
	onSubmit: (value: string) => void;
	isLoading?: boolean;
};

export const VerificationCode: React.FC<VerificationCodeProps> = ({
	resendCode,
	onSubmit,
	isLoading = false,
}) => {
	const [code, setCode] = React.useState(['', '', '', '']);
	const inputs = React.useRef<Array<HTMLInputElement | null>>([]);
	const [isFilled, setIsFilled] = React.useState(false);

	const processInput = (value: string, slot: number) => {
		const num = value;
		if (/[^0-9]/.test(num)) return;
		const newCode = [...code];
		newCode[slot] = num;
		setCode(newCode);
		if (slot !== length - 1) {
			inputs.current[slot + 1]?.focus();
		}
		if (newCode.every((num) => num !== '')) {
			setIsFilled(true);
		}
	};

	const onKeyUp = (keyCode: number, slot: number) => {
		if (keyCode === 8 && !code[slot] && slot !== 0) {
			const newCode = [...code];
			newCode[slot - 1] = '';
			setCode(newCode);
			inputs.current[slot - 1]?.focus();
			setIsFilled(false);
		}
	};

	return (
		<div className="bg-white pt-[18px] px-[25px] flex flex-col items-center">
			<div className="h-1 w-12 rounded bg-gray-800 mb-6"></div>
			<Typography type="title" className="mb-4 text-center font-bold">
				Verification Code
			</Typography>
			<Typography type="subTitle" className="mb-4 text-center">
				Enter the 4-digit code sent to your email
			</Typography>
			<div className="grid grid-flow-col gap-6 w-full mb-6 justify-center">
				{code.map((num, i) => (
					<input
						className={clsx(
							{ 'bg-transparent-color-gray-200 border-0': !!code[i] },
							'w-9 h-12 rounded-10 border border-gray-200 p-0 text-center font-bold text-4xl',
							'focus:outline-none focus:bg-transparent-color-gray-200 focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-200 focus:ring-transparent focus:border focus:'
						)}
						key={`code-${i}`}
						name={`code-${i}`}
						type="text"
						inputMode="numeric"
						autoComplete="off"
						maxLength={1}
						value={num}
						autoFocus={!code[0].length && i === 0}
						onChange={(e) => processInput(e.target.value, i)}
						onKeyUp={(e) => onKeyUp(e.keyCode, i)}
						ref={(ref) => inputs.current.push(ref)}
					/>
				))}
			</div>
			<Typography type="caption" className="text-center mb-0">
				The code has not arrived?
			</Typography>
			<Typography
				type="caption"
				className={clsx(
					'cursor-pointer font-bold text-center mb-8 text-secondary',
					'hover:text-secondary'
				)}
				onClick={() => resendCode()}
			>
				Send new code
			</Typography>
			<Button
				className="mb-[34px]"
				// label={isLoading ? 'Loading...' : 'Confirm'}
				size="large"
				fill
				onClick={() => onSubmit(code.join(''))}
				disabled={!isFilled || isLoading}
			>
				<Typography type="smallTitle" className="font-bold">
					{isLoading ? 'Loading...' : 'Confirm'}
				</Typography>
			</Button>
		</div>
	);
};
