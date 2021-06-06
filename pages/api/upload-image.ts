import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import Formidable from 'formidable';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
	cloudinary.config({
		cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	let folder;
	const data = await new Promise<{ file: Formidable.File }>(
		(resolve, reject) => {
			const form = new formidable.IncomingForm({
				keepExtensions: true,
				multiples: false,
			});
			form.parse(req, (err, fields, files) => {
				if (err) return reject(err);
				resolve({ file: files.file as Formidable.File });
				folder = fields.folder;
			});
		}
	);
	try {
		const uploadedImage = await cloudinary.uploader.upload(data.file.path, {
			folder: folder,
		});
		res.statusCode = 200;
		res.json(uploadedImage);
	} catch (error) {
		console.log(error);
		res.statusCode = 500;
		res.json({ secure_url: 'error' });
	}
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default endpoint;
