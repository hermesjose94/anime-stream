import { OptionType } from 'interfaces';

export const gender: OptionType[] = [
	{
		text: 'Select...',
		value: '',
		disabled: false,
		placeholder: true,
	},
	{ text: 'Male', value: 'male', disabled: false, placeholder: false },
	{ text: 'Female', value: 'male', disabled: false, placeholder: false },
	{
		text: 'Do not specify',
		value: 'undefined',
		disabled: false,
		placeholder: false,
	},
];
