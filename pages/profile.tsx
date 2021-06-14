import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import clsx from 'clsx';
import { useToasts } from 'react-toast-notifications';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from 'hooks/user';
import { useModal } from 'hooks/modal';
import { Images, Media, UserType } from 'interfaces';
import { Layout } from 'components/layout';
import { Typography } from 'components/common/typography';
import { PasswordForm, UserForm } from 'components/user';
import { Button } from 'components/common/button';
import { uploadImage } from 'lib/upload-file';
import { GET_USER } from 'api';
import { updatedAvatar, updatedUser, updatedPassword } from 'api';
import { ImageCrop } from 'components/image-crop';

const Profile = () => {
	const { user, token, isLoading: loadingUser } = useUser();
	const { Modal, hide, isShow, show } = useModal();
	const { addToast } = useToasts();
	const queryClient = useQueryClient();
	const [avatar, setAvatar] = React.useState<Media>();
	const [avatarCrop, setAvatarCrop] = React.useState<Media>();
	const [isLoading, setIsLoading] = React.useState(false);
	const [saveAvatar, setSaveAvatar] = React.useState(false);
	const [initialData, setInitialData] = React.useState({
		fullname: user?.fullname || '',
		email: user?.email || '',
		username: user?.username || '',
	});

	const mutationAvatar = useMutation(updatedAvatar, {
		onMutate: async (user) => {
			await queryClient.cancelQueries(GET_USER);
			const previousUser = queryClient.getQueryData(GET_USER) as UserType;
			queryClient.setQueryData(GET_USER, {
				...previousUser,
				avatar: user.avatar,
				avatar_id: user.avatar_id,
			});
			return { previousUser };
		},
		onError: (_err, _user, context: any) => {
			addToast('updated avatar error', {
				appearance: 'error',
			});
			queryClient.setQueryData(GET_USER, context.previousUser);
		},
		onSuccess: () => {
			addToast('changed avatar', {
				appearance: 'success',
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries(GET_USER);
		},
	});

	const mutationUser = useMutation(updatedUser, {
		onMutate: async (user) => {
			await queryClient.cancelQueries(GET_USER);
			const previousUser = queryClient.getQueryData(GET_USER) as UserType;
			queryClient.setQueryData(GET_USER, {
				...previousUser,
				email: user.email,
				fullname: user.fullname,
				username: user.username,
			});
			return { previousUser };
		},
		onError: (_err, _user, context: any) => {
			queryClient.setQueryData(GET_USER, context.previousUser);
			addToast('user or email already used', {
				appearance: 'error',
			});
		},
		onSuccess: () => {
			addToast('updated user', {
				appearance: 'success',
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries(GET_USER);
		},
	});

	const defaultAvatar = user
		? user.avatar === 'avatar.png'
			? Images.avatar
			: user.avatar
		: Images.avatar;

	React.useEffect(() => {
		if (user) {
			setInitialData({
				fullname: user.fullname,
				email: user.email,
				username: user.username,
			});
		}
	}, [user]);

	const onSubmitUserForm = async (data: any) => {
		console.log(data);
		if (user) {
			setIsLoading(true);
			mutationUser.mutate({
				token: token || '',
				id: user.id,
				email: data.email,
				fullname: data.fullname,
				username: data.username,
			});
			setIsLoading(false);
		}
	};
	const onSubmitPasswordForm = async (data: any) => {
		setIsLoading(true);
		try {
			const response = await updatedPassword({
				password: data.password,
				id: user?.id || '',
			});
			const json = await response.json();
			if (json.error) {
				addToast(json.error, { appearance: 'error' });
			} else {
				addToast('Password changed', {
					appearance: 'success',
				});
			}
		} catch (error) {
			addToast(error, { appearance: 'error' });
		}
		setIsLoading(false);
	};

	const handleMediaUpload = (file: File) => {
		const reader = new FileReader();

		reader.onload = function (e) {
			const uploadedObj = { file, url: e.target?.result as string };
			setAvatar(uploadedObj);
		};

		reader.readAsDataURL(file); // convert to base64 string
		show();
	};

	const handleCropModal = (media: Media) => {
		setAvatarCrop(media);
		hide();
		setSaveAvatar(true);
	};

	const uploadAvatar = async () => {
		if (avatarCrop && token && user) {
			setIsLoading(true);
			const responseImage = await uploadImage(
				avatarCrop.file,
				`users/${user.username}`
			);
			mutationAvatar.mutate({
				token: token,
				id: user.id,
				avatar: responseImage.url,
				avatar_id: responseImage.public_id,
				public_id_delete: user.avatar_id,
			});
			setIsLoading(false);
			setSaveAvatar(false);
		}
	};

	return (
		<Layout withHeader isLoading={loadingUser}>
			<div className="flex flex-col items-center justify-center px-14 py-5 w-full max-w-5xl mx-auto">
				<div className="flex w-full items-center justify-start">
					<Typography type="title">Edit Profile</Typography>
				</div>
				<div className="grid grid-cols-12 w-full py-8">
					<div className="col-span-full flex flex-col items-center justify-start mb-5 md:col-span-4">
						<div
							className={clsx(
								' bg-white inline-flex items-center w-32 h-32 overflow-hidden border-2 border-gray-400 rounded-full'
							)}
						>
							<Image
								src={
									avatarCrop
										? avatarCrop.url
										: avatar
										? avatar.url
										: defaultAvatar
								}
								height={128}
								width={128}
							/>
						</div>
						<div className="h-auto">
							<input
								id="file-avatar"
								name="file-avatar"
								accept="image/*;capture=camera"
								type="file"
								className="hidden"
								onChange={(event) =>
									event.target.files
										? handleMediaUpload(event.target.files[0])
										: null
								}
							/>
							<div className="mt-4 flex items-center justify-center">
								<label
									htmlFor="file-avatar"
									className={clsx(
										'text-primary border-primary px-8 py-3 border rounded-lg outline-none transition-colors duration-300 transform cursor-pointer',
										'hover:bg-primary hover:text-white hover:border-primary'
									)}
								>
									Change
								</label>
							</div>
							{!saveAvatar && avatar && (
								<div className={clsx('mt-4 flex items-center justify-center')}>
									<Button
										label={isLoading ? 'Loading...' : 'Crop'}
										onClick={show}
										disabled={isLoading}
									/>
								</div>
							)}
							<div
								className={clsx(
									'mt-4 flex items-center justify-center',
									!saveAvatar && 'hidden'
								)}
							>
								<Button
									label={isLoading ? 'Loading...' : 'Save'}
									onClick={uploadAvatar}
									disabled={isLoading}
								/>
							</div>
						</div>
					</div>
					<div className="col-span-full px-10 md:col-span-8">
						<Typography type="title-small" className="mb-8">
							Personal
						</Typography>
						<UserForm
							onHandleSubmit={onSubmitUserForm}
							initialData={initialData}
							isLoading={isLoading}
						/>
						<Typography type="title-small" className="my-8">
							Changed Password
						</Typography>
						<PasswordForm
							onHandleSubmit={onSubmitPasswordForm}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
			<Modal isShow={isShow}>
				<div className="w-full">
					<ImageCrop
						url={avatar ? avatar.url : defaultAvatar}
						setImage={handleCropModal}
						closeModal={hide}
					/>
				</div>
			</Modal>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
};

export default Profile;
