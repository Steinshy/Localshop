'use client';

// React
import { useContext, createRef, useState, ChangeEvent } from "react";

// NextUI
import { Card, CardBody, Spinner, Button, CardHeader, Avatar } from "@nextui-org/react";

// Actions
import { updateAvatar } from '@actions/actionsUser';

// Utils
import { UserContext } from '@subProviders/userProvider';
import { showToast } from "@utils/helpers";

const AvatarForm = () => {
  const userStore = useContext(UserContext),
        fileInputRef = createRef<HTMLInputElement>(),
        [isFetching, setIsFetching] = useState<boolean>(false);
  
  if (!userStore.data) return;
  const { update, data: { attributes: { avatar: { large } } } } = userStore;

  const fileChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;

    const file = e.target.files[0];
    void upload(file);
  };

  const upload = async (file:File):Promise<void> => {
    setIsFetching(true);
    const formData = new FormData();
    formData.append('user[avatar]', file);
    const { data, error } = await updateAvatar(formData);
    error ? showToast(error.message, 'error') : update(data);
    setIsFetching(false);
  };

  return (
    <Card>
      <CardHeader>
        Avatar
      </CardHeader>
      <CardBody>
        <div className='flex justify-center items-center'>
          <Avatar
            isLoading={isFetching}
            isBordered
            as={Button}
            className='transition-transform min-w-0 p-0 w-[100px] h-[100px]'
            color='default'
            radius='md'
            onClick={() => fileInputRef.current?.click()}
            src={large}
            spinner={<Spinner color='primary' className='absolute top-50 left-50' />}
          />
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => fileChange(e)}
            hidden
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default AvatarForm;
