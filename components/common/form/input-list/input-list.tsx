import * as React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { OptionType } from 'interfaces';
import { InputProps } from 'interfaces/common';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Typography } from 'components/common/typography';

export interface InputListProps {
	options: OptionType[];
	myDefaultValue?: string;
	handleChange: (value: string) => void;
}

const getDefaultValue = (options: OptionType[], value: string) => {
	return options.filter((opt) => opt.value === value)[0] || options[0];
};

export const InputList: React.FC<
	InputProps & InputListProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ options, myDefaultValue, handleChange, hideTitle, ...props }) => {
	const [selected, setSelected] = React.useState(
		myDefaultValue ? getDefaultValue(options, myDefaultValue) : options[0]
	);
	React.useEffect(() => {
		console.log(selected.value);

		handleChange(selected.value);
	}, [selected.value]);
	return (
		<div className="py-2">
			<input
				id={props.name}
				name={props.name}
				type="text"
				value={selected.value}
				className="hidden"
				readOnly
				ref={props.register ? props.register(props.rules) : () => ({})}
			/>
			<Listbox value={selected} onChange={setSelected}>
				{({ open }) => (
					<>
						<Listbox.Label className="block">
							{!hideTitle && (
								<Typography type="label" className="ml-3 font-bold">
									{props.title}
								</Typography>
							)}
						</Listbox.Label>
						<div className="relative mt-2">
							<Listbox.Button
								className={clsx(
									selected.placeholder
										? 'bg-white'
										: 'bg-transparent-color-gray-200',
									'relative pb-2 pl-4 pr-10 pt-3 w-full text-left border border-gray-200 rounded-10 cursor-pointer',
									'focus:outline-none'
								)}
							>
								<span className="flex items-center">
									<span
										className={clsx(
											selected.placeholder ? 'text-gray-200' : 'text-gray-800',
											'block truncate'
										)}
									>
										{selected.text}
									</span>
								</span>
								<span className="absolute inset-y-0 right-0 flex items-center ml-3 pr-2 pointer-events-none">
									<ChevronDownIcon
										className="w-5 h-5 text-gray-200"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={React.Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options
									static
									className="absolute z-10 mt-1 w-full max-h-56 bg-white border border-gray-200 rounded-md focus:outline-none shadow-lg overflow-auto"
								>
									{options.map((option) => (
										<Listbox.Option
											key={option.text}
											className={({ active, selected }) =>
												clsx(
													selected && 'bg-gray-200 text-gray-800',
													active
														? 'text-gray-800 font-bold bg-gray-200'
														: 'text-gray-800',
													'relative pl-3 pr-9 py-2 cursor-pointer select-none'
												)
											}
											value={option}
										>
											{({ selected }) => (
												<>
													<div className="flex items-center">
														<span
															className={clsx(
																selected && 'font-bold',
																'block ml-3 truncate'
															)}
														>
															{option.text}
														</span>
													</div>

													{selected ? (
														<span
															className={clsx(
																'absolute inset-y-0 right-0 flex items-center pr-4 text-gray-800'
															)}
														>
															<CheckIcon
																className="w-5 h-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
};
