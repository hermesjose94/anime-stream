import * as React from 'react';
import { Input } from 'components/common/form/input';
import { InputProps } from 'interfaces/common';

export const InputNumber: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ name, setValueInput, ...props }) => {
	const handleChange = (e: any) => {
		const val = e.target.value;
		if (!!isNaN(val)) {
			const cadena = val.substring(0, val.length - 1);
			setValueInput && setValueInput(name, cadena);
		}
	};

	return (
		<>
			<Input name={name} type="text" onChange={handleChange} {...props}></Input>
		</>
	);
};
