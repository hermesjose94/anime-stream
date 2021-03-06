import imageCompression from 'browser-image-compression';
import { ImageResponse } from 'interfaces';

const imageCompressionOptions = {
	maxSizeMB: 3,
	maxWidthOrHeight: 600,
	useWebWorker: true,
};

export const uploadImage = async (
	image: File,
	folder: string
): Promise<ImageResponse> => {
	let uploadedImage: ImageResponse = {
		url: '',
		public_id: '',
	};
	await imageCompression(image, imageCompressionOptions)
		.then((compressedFile) => {
			const formData = new FormData();
			formData.append('file', compressedFile);
			formData.append('folder', folder);
			return fetch('/api/upload-image', { method: 'POST', body: formData });
		})
		.then((response) => response.json())
		.then((data) => {
			if (data.secure_url !== '') {
				uploadedImage = { url: data.secure_url, public_id: data.public_id };
			}
			return;
		})
		.catch((err) => console.error(err));
	return uploadedImage;
};

export const uploadFiles = async (images: File[]) => {
	const uploadedImages: { url: string; index: number }[] = [];

	await Promise.all(
		images.map((image, index) => {
			return imageCompression(image, imageCompressionOptions)
				.then((compressedFile) => {
					const formData = new FormData();
					formData.append('file', compressedFile);
					return fetch('/api/upload-image', { method: 'POST', body: formData });
				})
				.then((response) => response.json())
				.then((data) => {
					if (data.secure_url !== '') {
						uploadedImages.push({ url: data.secure_url, index });
					}
					return;
				})
				.catch((err) => console.error(err));
		})
	);

	const sortImages = uploadedImages
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allImages = `{${sortImages}}`;
	return allImages;
};

export const uploadVideos = async (videos: File[]) => {
	const uploadedVideos: { url: string; index: number }[] = [];
	await Promise.all(
		videos.map((video, index) => {
			const formData = new FormData();
			formData.append('file', video);
			formData.append(
				'upload_preset',
				`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
			);
			return fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
				{
					method: 'POST',
					body: formData,
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.secure_url !== '') {
						uploadedVideos.push({ url: data.secure_url, index });
					}
					return;
				})
				.catch((err) => console.error(err));
		})
	);
	const sortVideos = uploadedVideos
		.sort((a, b) => a.index - b.index)
		.map((image) => image.url);
	const allVideos = `{${sortVideos}}`;
	return allVideos;
};

export const uploadNoteVoice = async (audio: File) => {
	const formData = new FormData();
	formData.append('file', audio);
	formData.append(
		'upload_preset',
		`${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET}`
	);
	const data = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
		{
			method: 'POST',
			body: formData,
		}
	);
	const jsonData = await data.json();
	return jsonData.secure_url || '';
};
