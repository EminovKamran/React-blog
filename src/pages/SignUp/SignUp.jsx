import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { loginAction, setUser } from '../../store/reducers/userReducer';
import { fetchSignIn, fetchSignUp } from '../../api/user';

import './SignUp.scss';

function SignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const history = useNavigate();

  const getErrorMessage = (field) => {
    if (errors[field]) {
      return (
        <span className='form__message' style={{ color: 'red' }}>
          {errors[field].message}
        </span>
      );
    }
    return null;
  }; /// вынести в отдельный файл

  async function submitForm(data) {
    setIsLoading(true);
    const responseUp = await fetchSignUp({ user: data });
    dispatch(
      setUser({
        username: data.username,
        email: data.email,
        bio: 'start up',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      }),
    );
    if (responseUp !== undefined) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(responseUp.user.token),
      );
      await fetchSignIn({
        user: {
          email: data.email,
          password: data.password,
        },
      });
    }
    dispatch(loginAction(true));
    history('/');
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <LinearProgress color='secondary' />}
      <div className={`wrapper-form ${isLoading ? 'active' : ''}`}>
        <div className='form-container'>
          <span className='form__name'>Create new account</span>
          <form className='form' onSubmit={handleSubmit(submitForm)}>
            <label className='form__label'>
              Username
              <input
                {...register('username', {
                  required: 'empty',
                  minLength: {
                    value: 3,
                    message: 'Minimum 2 symbols',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum 12 symbols',
                  },
                })}
                type='text'
                className='form__input'
                placeholder='Username'
                name='username'
                disabled={isLoading}
              />
              {getErrorMessage('username')}
            </label>
            <label className='form__label'>
              Email address
              <input
                {...register('email', {
                  required: 'input empty',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 symbols',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Maximum 40 symbols',
                  },
                })}
                type='email'
                className='form__input'
                placeholder='Email address'
                disabled={isLoading}
              />
              {getErrorMessage('email')}
            </label>
            <label className='form__label'>
              Password
              <input
                name='password'
                type='password'
                className='form__input'
                placeholder='Password'
                {...register('password', {
                  required: 'You must specify a password',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
                disabled={isLoading}
              />
              {getErrorMessage('password')}
            </label>
            <label className='form__label'>
              Repeat Password
              <input
                name='password_repeat'
                type='password'
                className='form__input'
                placeholder='Repeat Password'
                {...register('password_repeat', {
                  validate: (value) =>
                    value === watch('password') || 'The passwords do not match',
                })}
                disabled={isLoading}
              />
              {getErrorMessage('password_repeat')}
            </label>
            <label className='personal-info'>
              <input
                type='checkbox'
                checked={check}
                onChange={() => setCheck(!check)}
              />
              I agree to the processing of my personal information
            </label>
            <input
              className='button'
              type='submit'
              checked={check}
              value={isLoading ? 'Loading...' : 'Login'}
              disabled={!check || isLoading}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
