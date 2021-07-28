import React from 'react';
import { ErrorOption } from 'react-hook-form';

export interface InputProps {
	name: string;
	isFill?: boolean;
	optional?: boolean;
	NoterrorMessage?: boolean;
	title?: string;
	customPlaceholder?: string;
	prefix?: string;
	sufix?: string;
	register?: any;
	rules?: Record<string, unknown>;
	rightImg?: React.ReactNode;
	leftImg?: React.ReactNode;
	hideTitle?: boolean;
	rightClick?: () => void;
	leftClick?: () => void;
	onChangeState?: (val: any) => void;
	error?: any;
	setValueInput?: (
		name: string,
		value: any,
		config?: Partial<{
			shouldValidate: boolean;
			shouldDirty: boolean;
		}>
	) => void;
	onChangeCustom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setError?: (name: string, error: ErrorOption) => void;
}
