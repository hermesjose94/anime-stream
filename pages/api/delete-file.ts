import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { public_id } = JSON.parse(req.body);
		cloudinary.config({
			cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		try {
			const deletedImage = await cloudinary.uploader.destroy(
				String(public_id),
				function (err, result) {
					console.log(result);
					console.log(err);
				}
			);

			res.statusCode = 200;
			res.json({ deletedImage });
		} catch (error) {
			console.log(error);
			res.statusCode = 500;
			res.json({ error });
		}
	}
};
