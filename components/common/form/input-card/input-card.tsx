import * as React from 'react';
import { Input } from 'components/common/form/input';
import { InputProps } from 'interfaces/common';

export const InputCard: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ name, setValueInput, rules, ...props }) => {
	const [isDelete, setIsDelete] = React.useState(false);

	const onKeyDownHandler = (event: any) => {
		var codigo = event.which || event.keyCode;
		if (codigo === 8) {
			setIsDelete(true);
		} else {
			setIsDelete(false);
		}
	};

	const handleChange = (e: any) => {
		const val = e.target.value;
		const cadena = val.replace(/\s/g, '').replaceAll('+', '');
		let newFormat = false;
		if (!isDelete) {
			if (!isNaN(cadena)) {
				let format: string = '';
				//5555 4122 4282 3282 = 19
				//4444 = 4
				//44441111 = 8
				//444411113333 = 12
				//4444111133338888 = 16
				if (cadena.length === 4) {
					newFormat = true;
					format = cadena.replace(/([0-9]{4})/g, '$1 ');
				} else if (cadena.length === 8) {
					newFormat = true;
					format = cadena.replace(/([0-9]{4})([0-9]{4})/g, '$1 $2 ');
				} else if (cadena.length === 12) {
					newFormat = true;
					format = cadena.replace(
						/([0-9]{4})([0-9]{4})([0-9]{4})/g,
						'$1 $2 $3 '
					);
				} else if (cadena.length === 16) {
					newFormat = true;
					format = cadena.replace(
						/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]{4})/g,
						'$1 $2 $3 $4'
					);
				}
				setValueInput &&
					setValueInput(name, newFormat ? format : val, {
						shouldValidate: true,
						shouldDirty: true,
					});
			} else {
				const cadena = val.substring(0, val.length - 1);
				setValueInput &&
					setValueInput(name, cadena, {
						shouldValidate: true,
						shouldDirty: true,
					});
			}
		}
		setIsDelete(false);
	};

	const finalRules = React.useMemo(() => {
		return {
			...rules,
			maxLength: {
				value: 19,
				message: 'Number no valid',
			},
			// minLength: {
			// 	value: 15,
			// 	message: 'The number has at least 15 numbers',
			// },
		};
	}, [rules]);

	return (
		<>
			<Input
				name={name}
				type="tel"
				onChange={handleChange}
				onKeyDown={onKeyDownHandler}
				maxLength={19}
				rules={finalRules}
				{...props}
			></Input>
		</>
	);
};
