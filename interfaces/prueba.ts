export type NameType = {
	title: string;
	first: string;
	last: string;
};

export type StreetType = {
	number: number;
	name: string;
};

export type CoordinatesType = {
	latitude: string;
	longitude: string;
};

export type TimezoneType = {
	offset: string;
	description: string;
};

export type LocationType = {
	street: StreetType;
	city: string;
	state: string;
	country: string;
	postcode: number;
	coordinates: CoordinatesType;
	timezone: TimezoneType;
};

export type LoginType = {
	uuid: string;
	username: string;
	password: string;
	salt: string;
	md5: string;
	sha1: string;
	sha256: string;
};

export type DobType = {
	date: string;
	age: number;
};

export type RegisteredType = {
	date: string;
	age: number;
};

export type IdType = {
	name: string;
	value: string;
};

export type PictureType = {
	large: string;
	medium: string;
	thumbnail: string;
};

export type PruebaType = {
	gender: string;
	name: NameType;
	location: LocationType;
	email: string;
	login: LoginType;
	dob: DobType;
	registered: RegisteredType;
	phone: string;
	cell: string;
	id: IdType;
	picture: PictureType;
	nat: string;
};
