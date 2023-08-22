import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEditProfile } from '../../api/user';
import { updateUserDataAction } from '../../store/reducers/userReducer';

import './EditProfilePage.scss';

function EditProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { register, handleSubmit } = useForm({});
  const token = JSON.parse(localStorage.getItem('currentUser'));

  async function submitForm(data) {
    const responseEdit = await fetchEditProfile({ user: data }, token);
    dispatch(updateUserDataAction(responseEdit.user));
  }

  return (
    <div className='wrapper-form'>
      <div className='form-container'>
        <span className='form__name'>Edit Profile</span>
        <form className='form' onSubmit={handleSubmit(submitForm)}>
          <label className='form__label'>
            Username
            <input
              {...register('username')}
              type='text'
              className='form__input'
              placeholder='Username'
              name='username'
              defaultValue={user.username}
            />
          </label>
          <label className='form__label'>
            Email address
            <input
              {...register('email')}
              type='email'
              className='form__input'
              placeholder='Email address'
              defaultValue={user.email}
            />
          </label>
          <label className='form__label'>
            Bio
            <input
              {...register('bio')}
              name='bio'
              type='text'
              className='form__input'
              placeholder='Bio'
              defaultValue={user.bio}
            />
          </label>
          <label className='form__label'>
            Avatar image (url)
            <input
              {...register('image')}
              name='image'
              type='text'
              className='form__input'
              placeholder='Avatar image'
              defaultValue={user.image}
            />
          </label>
          <input className='button' type='submit' value='Save' />
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
