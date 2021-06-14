import React from 'react';

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
	setValueInput?: (name: string, text: string) => void;
	error?: any;
}
