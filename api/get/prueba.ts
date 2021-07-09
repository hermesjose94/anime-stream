import { PruebaType } from 'interfaces/prueba';

export const getPrueba = async (): // variables: any | undefined
Promise<PruebaType[]> => {
	const data = await fetch('https://randomuser.me/api/?results=20');
	const res = await data.json();

	return res.results;
};
