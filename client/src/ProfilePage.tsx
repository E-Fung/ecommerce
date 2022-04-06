import React from 'react';
import { User, State } from './models/redux';
import { connect } from 'react-redux';
import { emptyUser } from './assets';
import { updateUser } from './redux/utils/thunkCreators';
import { Link } from 'react-router-dom';

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
    <div className='flex flex-wrap justify-center max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 text-white'>
      <div className='flex border-4 p-4'>
        <div className=''>
          <div className='flex h-96 w-full justify-center items-center bg-white border-4 rounded-lg p-4'>
            <img className='max-w-full max-h-full' src={user.photoUrl ? user.photoUrl : emptyUser} alt='' />
          </div>
          <div className='flex justify-center'>
            <div>Change Profile Picture</div>
          </div>
          <div className='flex justify-center'>
            <input type='file' id='image_upload' name='image_upload' accept='image/*' onChange={handleImage} />
          </div>
        </div>
        <div className=''>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
        </div>
      </div>
      <div className='border-4 p-4'>
        <div>Your Addresses</div>
        <div>Your Payments</div>
        <Link to={'/orders'}>
          <div> Your Orders</div>
        </Link>
      </div>
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
