import React from 'react';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useModal } from 'hooks/modal';
import {
	getUser,
	GET_USER,
	updatedAvatar,
	updatedUser,
	updatedPassword,
	updatedRole,
} from 'api';
import { uploadImage } from 'lib/upload-file';
import { Images, Media, UserType } from 'interfaces';
import { ImageCrop } from 'components/image-crop';
import { LayoutDashboard } from 'components/layout';
import { Typography } from 'components/common/typography';
import { PasswordForm, RoleForm, UserForm } from 'components/user';
import { Button } from 'components/common/button';

const Edit = () => {
	const router = useRouter();
	const { Modal, hide, isShow, show } = useModal();
	const { addToast } = useToasts();
	const queryClient = useQueryClient();
	const { id } = router.query;
	const userId = React.useMemo(() => {
		return id as string;
	}, [id]);
	const [session] = useSession();
	const token = session?.token ? (session?.token as string) : '';
	const { data: userData, isLoading: loadingUser } = useQuery<UserType>(
		[GET_USER, userId],
		() => getUser(token, userId)
	);

	const [avatar, setAvatar] = React.useState<Media>();
	const [avatarCrop, setAvatarCrop] = React.useState<Media>();
	const [isLoading, setIsLoading] = React.useState(false);
	const [saveAvatar, setSaveAvatar] = React.useState(false);
	const [initialData, setInitialData] = React.useState({
		fullname: userData?.fullname || '',
		email: userData?.email || '',
		username: userData?.username || '',
	});

	const defaultAvatar = userData
		? userData.avatar === 'avatar.png'
			? Images.avatar
			: userData.avatar
		: Images.avatar;

	React.useEffect(() => {
		if (userData) {
			setInitialData({
				fullname: userData.fullname,
				email: userData.email,
				username: userData.username,
			});
		}
	}, [userData]);

	const mutationAvatar = useMutation(updatedAvatar, {
		onMutate: async (user) => {
			await queryClient.cancelQueries([GET_USER, userId]);
			const previousUser = queryClient.getQueryData([
				GET_USER,
				userId,
			]) as UserType;
			queryClient.setQueryData([GET_USER, userId], {
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
			queryClient.setQueryData([GET_USER, userId], context.previousUser);
		},
		onSuccess: () => {
			addToast('changed avatar', {
				appearance: 'success',
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries([GET_USER, userId]);
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

	const mutationRole = useMutation(updatedRole, {
		onMutate: async (user) => {
			await queryClient.cancelQueries([GET_USER, userId]);
			const previousUser = queryClient.getQueryData([
				GET_USER,
				userId,
			]) as UserType;
			queryClient.setQueryData([GET_USER, userId], {
				...previousUser,
				role: user.role,
			});
			return { previousUser };
		},
		onError: (_err, _user, context: any) => {
			addToast('updated role error', {
				appearance: 'error',
			});
			queryClient.setQueryData([GET_USER, userId], context.previousUser);
		},
		onSuccess: () => {
			addToast('changed role', {
				appearance: 'success',
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries([GET_USER, userId]);
		},
	});

	const onSubmitUserForm = async (data: any) => {
		if (userData) {
			setIsLoading(true);
			mutationUser.mutate({
				token: token,
				id: userData.id,
				email: data.email,
				fullname: data.fullname,
				username: data.username,
			});
			setIsLoading(false);
		}
	};

	const onSubmitRoleForm = async (data: any) => {
		if (userData) {
			setIsLoading(true);
			mutationRole.mutate({
				token: token,
				id: userData.id,
				role: data.role,
			});
			setIsLoading(false);
		}
	};

	const onSubmitPasswordForm = async (data: any) => {
		setIsLoading(true);
		if (userData) {
			try {
				const response = await updatedPassword({
					password: data.password,
					id: userData.id,
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
		if (avatarCrop && token && userData) {
			setIsLoading(true);
			const responseImage = await uploadImage(
				avatarCrop.file,
				`users/${userData.username}`
			);
			mutationAvatar.mutate({
				token: token,
				id: userData.id,
				avatar: responseImage.url,
				avatar_id: responseImage.public_id,
				public_id_delete: userData.avatar_id,
			});
			setIsLoading(false);
			setSaveAvatar(false);
		}
	};

	return (
		<LayoutDashboard title="Edit User" isLoading={loadingUser} showBack>
			<div className="py-4">
				<div className="flex flex-col items-center justify-center px-14 py-5 w-full max-w-5xl mx-auto">
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
									<div
										className={clsx('mt-4 flex items-center justify-center')}
									>
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
								Role profile
							</Typography>
							<RoleForm
								onHandleSubmit={onSubmitRoleForm}
								defaultRole={userData?.role || ''}
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
			</div>
		</LayoutDashboard>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const user = (session?.user as unknown) as UserType;
	if (session && session.user && user.role !== 'admin') {
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

export default Edit;
