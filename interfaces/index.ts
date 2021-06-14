export enum Icons {
	facebook = '/img/svg/icons/facebook.svg',
	google = '/img/svg/icons/google.svg',
}

export type IconsType = Icons.facebook | Icons.google;

export enum Images {
	avatar = '/img/png/avatar.png',
	logo = '/img/png/logo.png',
	logoWhite = '/img/png/logoWhite.png',
	circuit = '/img/auth/circuit.svg',
	login = '/img/auth/auth.jpg',
	register = '/img/auth/register.jpg',
}

export type ImagesType =
	| Images.logo
	| Images.logoWhite
	| Images.circuit
	| Images.login
	| Images.register;

export type OptionType = {
	text: string;
	value: string;
	disabled: boolean;
	placeholder: boolean;
};

export type UserType = {
	id: string;
	email: string;
	username: string;
	fullname: string;
	role: string;
	avatar: string;
	avatar_id: string;
};

export type SesionType = {
	expires: string;
	token: string;
	user: UserType;
};

export type UserSignUpType = {
	id: string;
	email: string;
	username: string;
	fullname: string;
	password: string;
};

export type ImageResponse = {
	url: string;
	public_id: string;
};

export type UpdatedAvatarType = {
	token: string;
	id: string;
	avatar: string;
	avatar_id: string;
	public_id_delete: string;
};

export type UpdatedUserType = {
	token: string;
	id: string;
	username: string;
	email: string;
	fullname: string;
};

export type UpdatedPasswordType = {
	id: string;
	password: string;
};

export type UpdatedRoleType = {
	token: string;
	id: string;
	role: string;
};

export type DeletedUserType = {
	id: string;
	token: string;
};

export type PaginationType = {
	currentPage: number;
	totalPages: number;
	pageLimit: number;
	totalRecords: number;
};

export type Media = {
	url: string;
	file: File;
};
