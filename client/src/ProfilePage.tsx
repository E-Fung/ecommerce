import React from 'react';
import { User, State } from './models/redux';
import { connect } from 'react-redux';
import { emptyUser } from './assets';
import { updateUser } from './redux/utils/thunkCreators';

type Props = { user: User; updateUser: any };

const ProfilePage: React.FC<Props> = ({ user, updateUser }) => {
  const handleImage = async (event: any) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', 'rvsntehp');
    fetch('https://api.cloudinary.com/v1_1/db7wfnuge/image/upload', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      response.json().then(async (data) => {
        uploadUrl(data.url);
      });
    });
  };

  const uploadUrl = async (url: string) => {
    await updateUser(url);
  };

  return (
    <div className='justify-center flex flex-wrap max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 text-white'>
      <img src={user.photoUrl ? user.photoUrl : emptyUser} alt='' />
      <input type='file' id='image_upload' name='image_upload' accept='image/*' onChange={handleImage} />
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateUser: (params: string) => {
      dispatch(updateUser(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
