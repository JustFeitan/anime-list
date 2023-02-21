import { FC, useCallback, useState } from "react";
import Form from "../UI/Form/Form";
import Input from "../UI/inputs/Input/Input";
import "./EditProfileModal.scss";
import { useDropzone } from "react-dropzone";
import Avatar from "../UI/Avatar/Avatar";
import { IUser } from "../../models/User/IUser";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../UI/Modal/Modal";
import { authApi } from "../../services/AuthService";
import { useAppDispatch } from "../../hooks/redux";
import { authActions } from "../../store/reducers/auth";

interface EditProfileProps {
  user: Omit<IUser, "password">;
  onSubmitHandler: () => void;
}

type updatedUserFields = Pick<
  IUser,
  "username" | "profileCover" | "userAvatar"
>;

const EditProfile: FC<EditProfileProps> = ({
  user,
  onSubmitHandler,
  ...props
}) => {
  const [sizeErrors, setSizeErrors] = useState<{ error: string }[]>([]);

  const [avatar, setAvatar] = useState<string | null | ArrayBuffer>(
    user.userAvatar
  );
  const [profileCover, setProfileCover] = useState<string | null | ArrayBuffer>(
    user.profileCover
  );
  const dispatch = useAppDispatch();
  // User avatar dropzone process
  const onAvatarDrop = useCallback(async (acceptedFiles: File[]) => {
    let reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        console.log("work", img.width, img.height);
        if (img.height < 200 || img.width < 200) {
          setSizeErrors([
            ...sizeErrors,
            {
              error:
                "Image size have to be at least 200px wight and 200px height",
            },
          ]);
          return;
        } else {
          setAvatar(reader.result);
        }
      };
    };
  }, []);
  // User cover profile dropzone process
  const onCoverDrop = useCallback((acceptedFiles: File[]) => {
    let reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      console.log("work", img.width, img.height);
      img.onload = () => {
        if (img.height < 200 || img.width < 900) {
          console.log("work", img.width, img.height);
          setSizeErrors([
            ...sizeErrors,
            {
              error:
                "Image size have to be at least 200px wight and 900px height",
            },
          ]);
          return;
        } else {
          console.log(sizeErrors);
          setProfileCover(reader.result);
        }
      };
    };
  }, []);

  const {
    getInputProps: getAvatarInputProps,
    getRootProps: getAvatarRootProps,
    fileRejections: fileAvatarRejections,
  } = useDropzone({
    onDrop: onAvatarDrop,
    maxFiles: 1,
  });

  const {
    getInputProps: getCoverInputProps,
    getRootProps: getCoverRootProps,
    fileRejections: fileCoverRejections,
  } = useDropzone({
    onDrop: onCoverDrop,
    maxFiles: 1,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<updatedUserFields>({
    defaultValues: { username: user.username },
  });
  const [updateUser, { isLoading }] = authApi.useUpdateUserMutation();

  //Add compare of user and updated user
  const onProfileChangesSubmit: SubmitHandler<updatedUserFields> = async (
    updatedUserFiles
  ) => {
    const updatedUser: Omit<IUser, "password"> = {
      ...user,
      ...updatedUserFiles,
      profileCover: profileCover,
      userAvatar: avatar,
    };
    await updateUser(updatedUser);
    dispatch(authActions.setUserBio(updatedUser));
    onSubmitHandler();
  };

  const modalErrorOkHandler = () => {
    fileCoverRejections.length = 0;
    fileAvatarRejections.length = 0;
    setProfileCover(user.profileCover);
    setAvatar(user.userAvatar);
    setSizeErrors([]);
  };

  return (
    <Form
      className="profile-edit"
      onSubmit={handleSubmit(onProfileChangesSubmit)}
    >
      <Input
        label="Cover"
        {...register("profileCover")}
        {...getCoverInputProps()}
      />
      <img
        {...getCoverRootProps()}
        className="profile-edit__cover"
        src={profileCover as string}
      />

      <Input
        label="Avatar"
        {...register("userAvatar")}
        {...getAvatarInputProps()}
      />
      <Avatar
        {...getAvatarRootProps()}
        size={120}
        avatarImage={avatar as string}
      />

      <Input {...register("username")} label="Username" />

      <MyPrimaryButton isLoading={isLoading}>Apply</MyPrimaryButton>
      {/*!!!!!Don't close on click outside of window*/}

      <Modal className="profile-edit__modal" visible={!!sizeErrors.length}>
        <div className="profile-edit__wrong-img-size">
          {sizeErrors.length && sizeErrors[0].error}
        </div>
        <MyPrimaryButton
          width={100}
          type="button"
          onClick={modalErrorOkHandler}
        >
          Ok
        </MyPrimaryButton>
      </Modal>
    </Form>
  );
};

export default EditProfile;

// <Modal className='profile-edit__modal'
//        visible={!!fileCoverRejections.length || !!fileAvatarRejections.length}
// >
//     <div className='profile-edit__wrong-img-size'>
//         {fileAvatarRejections.length && fileAvatarRejections[0].errors[0].message}
//         {fileCoverRejections.length && fileCoverRejections[0].errors[0].message}
//     </div>
//     <MyPrimaryButton width={100} onClick={modalErrorOkHandler}>Ok</MyPrimaryButton>
// </Modal>
