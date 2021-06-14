import React, { useState, useCallback } from 'react';
import getCroppedImg from './cropImage';
import Cropper from 'react-easy-crop';
import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Media } from 'interfaces';
import { InputRange } from 'components/common/form/input-range';
import { useForm } from 'react-hook-form';

export const ImageCrop: React.FC<{
	url: string;
	setImage: (media: Media) => void;
	closeModal: () => void;
}> = ({ url, setImage, closeModal }) => {
	const { register, watch, setValue } = useForm({
		mode: 'onChange',
	});
	const MAX_ZOOM = 3;
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
		// console.log({ croppedArea });
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const setValueInput = (name: string, text: string) => {
		setValue(name, text, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	React.useEffect(() => {
		const zoom = (Number(watch('zoom')) * MAX_ZOOM) / 100;
		console.log({ zoom });
		setZoom(zoom);
	}, [watch('zoom')]);

	React.useEffect(() => {
		const rotate = Number(watch('rotate'));
		setRotation(rotate);
	}, [watch('rotate')]);

	const croppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				url,
				croppedAreaPixels,
				rotation
			);
			if (croppedImage) {
				const file = new File([croppedImage], 'avatar.jpeg', {
					lastModified: Date.now(),
					type: 'image/jpeg',
				});
				const data = {
					file: file,
					url: croppedImage,
				};
				console.log({ media: data });
				setImage(data);
			}
		} catch (e) {
			console.error(e);
		}
	}, [croppedAreaPixels, rotation]);

	return (
		<div>
			<div
				className={clsx(
					'relative w-full h-52 bg-transparent-600',
					'md:max-h-75'
				)}
			>
				<Cropper
					image={url}
					crop={crop}
					rotation={rotation}
					zoom={zoom}
					aspect={4 / 4}
					onCropChange={setCrop}
					onRotationChange={setRotation}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div className="w-full grid grid-flow-row">
				<InputRange
					name="zoom"
					title="Zoom"
					min={1}
					max={100}
					defaultValue={Math.round((zoom * 100) / MAX_ZOOM)}
					sufix={'%'}
					prefix={'Zoom'}
					hideTitle={true}
					setValueInput={(name, text) => {
						setValueInput(name, text);
					}}
					register={register}
				/>
				<InputRange
					name="rotate"
					title="Rotate"
					min={0}
					max={360}
					defaultValue={0}
					sufix={'º'}
					hideTitle={true}
					setValueInput={(name, text) => {
						setValueInput(name, text);
					}}
					register={register}
				/>
			</div>
			<div className="flex items-center justify-center w-full mt-4">
				<Button
					label="Crop"
					size="small"
					onClick={croppedImage}
					className="mr-2"
				/>
				<Button
					label="Cancel"
					size="small"
					decoration="line-primary"
					onClick={closeModal}
				/>
			</div>
		</div>
	);
};
