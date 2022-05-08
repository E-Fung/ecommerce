import React, { useRef } from 'react';
import { User, State } from './models/redux';
import { connect } from 'react-redux';
import { emptyUser } from './assets';
import { updateUser, logout } from './redux/utils/thunkCreators';
import { Link, useNavigate } from 'react-router-dom';

type Props = { user: User; updateUser: any; logout: any };

const ProfilePage: React.FC<Props> = ({ user, updateUser, logout }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogout = async (event: any) => {
    event.preventDefault();
    await logout();
    navigate('/product');
  };

  const UserLogo = () => {
    return (
      <button
      type='button'
      className='bg-white flex justify-center content-center text-sm rounded-full overflow-clip border-2 border-primary p-2'
      id='user-menu-button'
      aria-expanded='false'
      aria-haspopup='true'
      onClick={() => fileRef.current?.click()}
      >
        <input hidden type='file' id='image_upload' name='image_upload' accept='image/*' onChange={handleImage} ref={fileRef} />
        {user.photoUrl ? (
          <div className='h-10 w-10 flex items-center justify-center'>
            <img src={user.photoUrl} alt='' className='max-w-full max-h-full' />
          </div>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10' fill='none' viewBox='0 0 24 24' stroke='black' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
          </svg>
        )}
      </button>
    );
  };

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
    <div className="grow text-black flex flex-col pt-8">
      <div className="flex justify-center">
        <div className="bg-primary p-1 rounded-full">
          <UserLogo/>
        </div>
      </div>
      <div className="text-center font-semibold">{user.name}</div>
      <div className="text-center font-semibold text-sm text-gray-400">{user.email}</div>
      <div className="bg-white m-4 rounded-md shadow-sm divide-y">
        <div className="flex items-center p-4 space-x-4">
          <svg version="1.1" id="Capa_1" className='h-10 w-10 fill-secondaryDeep' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" >
            <path d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z"/>
          </svg>
          <div className="font-semibold">Your Addresses</div>
        </div>
        <div className="flex items-center p-4 space-x-4">
          <svg version="1.1" id="Capa_1" className='h-10 w-10 fill-secondaryDeep' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 442.019 442.019" >
            <path d="M433.467,81.51H23.081C10.334,81.51,0,91.844,0,104.591v26.274h456.548v-26.274
              C456.548,91.844,446.214,81.51,433.467,81.51z"/>
            <path d="M0,351.957c0,12.747,10.334,23.081,23.081,23.081h410.385c12.747,0,23.081-10.334,23.081-23.081V198.355H0V351.957z
              M196.171,323.51h-29c-8.284,0-15-6.716-15-15s6.716-15,15-15h29c8.284,0,15,6.716,15,15S204.455,323.51,196.171,323.51z
              M348.467,293.51h47c8.284,0,15,6.716,15,15s-6.716,15-15,15h-47c-8.284,0-15-6.716-15-15S340.183,293.51,348.467,293.51z
              M303.171,308.51c0,8.284-6.716,15-15,15h-29c-8.284,0-15-6.716-15-15s6.716-15,15-15h29
              C296.455,293.51,303.171,300.226,303.171,308.51z M58.874,236.51h224c8.284,0,15,6.716,15,15s-6.716,15-15,15h-224
              c-8.284,0-15-6.716-15-15S50.59,236.51,58.874,236.51z M58.874,293.51h47c8.284,0,15,6.716,15,15s-6.715,15-15,15h-47
              c-8.284,0-15-6.716-15-15S50.59,293.51,58.874,293.51z"/>
          </svg>
          <div className="font-semibold">Your Payments</div>
        </div>
        <div>
          <Link to={'/orders'}>
            <div className="flex items-center p-4 space-x-4">
              <svg version="1.1" id="Capa_1" className='h-10 w-10 fill-secondaryDeep' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 442.019 442.019" >
                <path d="M436.893,365.748l-42.939-42.938c9.857-14.67,15.155-31.924,15.155-49.993c0-24.013-9.351-46.588-26.33-63.567
                  c-5.758-5.759-12.172-10.616-19.056-14.552v-4.653h43.734c6.74,0,12.649-3.297,15.808-8.819s3.003-12.288-0.414-18.096
                  L361.073,58.102c-4.118-7.001-12.342-11.705-20.465-11.705h-121.4h-12.885h-121.4c-8.125,0-16.349,4.705-20.464,11.704
                  L2.678,163.128c-3.418,5.809-3.573,12.574-0.415,18.097c3.159,5.522,9.068,8.819,15.808,8.819h43.735v81.282
                  c0,10.483,7.852,21.104,17.876,24.176l117.276,35.951c4.277,1.312,9.89,2.033,15.807,2.033s11.53-0.722,15.807-2.033l18.089-5.545
                  c2.684,3.662,5.677,7.167,8.985,10.475c16.979,16.979,39.555,26.33,63.567,26.33c18.069,0,35.323-5.299,49.993-15.155l42.939,42.938
                  c3.417,3.417,7.896,5.126,12.374,5.126s8.957-1.709,12.374-5.126C443.728,383.662,443.728,372.582,436.893,365.748z
                  M148.892,162.622H36.15l52.237-88.803h112.742L148.892,162.622z M224.656,73.957H337.05l52.075,88.527H276.731L224.656,73.957z
                  M276.859,315.17c-23.354-23.354-23.354-61.354,0-84.708c11.313-11.313,26.354-17.543,42.354-17.543
                  c15.999,0,31.04,6.23,42.354,17.543c11.313,11.313,17.543,26.354,17.543,42.354c0,15.999-6.23,31.04-17.543,42.354
                  c-11.313,11.313-26.354,17.543-42.354,17.543C303.213,332.713,288.172,326.482,276.859,315.17z"/>
              </svg>
              <div className="font-semibold">Your Orders</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex justify-center pt-6">
        <button onClick={handleLogout} className="bg-primary text-white rounded-full py-3 px-12 font-semibold">
          SIGN OUT
        </button>
      </div>
      {/* <div className='flex flex-wrap justify-center max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 text-black'>
        <div className='flex w-full border-4 rounded-lg space-x-4'>
          <div className='border-4 p-4'>
            <div>Your Addresses</div>
            <div>Your Payments</div>
            <Link to={'/orders'}>
              <div>Your Orders</div>
            </Link>
          </div>
          <div className='grow border-4 p-4 space-y-4'>
            <div className='flex items-center space-x-4 border-4 p-4'>
              <div className='flex h-28 w-28 w-full justify-center items-center bg-white border-4 rounded-full p-4 hover:bg-gray-200'>
                <input hidden type='file' id='image_upload' name='image_upload' accept='image/*' onChange={handleImage} ref={fileRef} />
                <img
                  onClick={() => fileRef.current?.click()}
                  className='max-w-full max-h-full cursor-pointer'
                  src={user.photoUrl ? user.photoUrl : emptyUser}
                  alt=''
                />
              </div>
              <div className='text-3xl font-semibold'>{user.name}</div>
            </div>
            <div className='border-4 flex justify-center'>
              <div>Email: {user.email}</div>
            </div>
          </div>
        </div>
      </div> */}
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
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
