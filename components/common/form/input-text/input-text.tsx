import * as React from 'react';
import { Input } from 'components/common/form/input';
import { InputProps } from 'interfaces/common';

export const InputText: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ value, ...props }) => {
	return (
		<>
			<Input type="text" defaultValue={value} {...props}></Input>
		</>
	);
};
