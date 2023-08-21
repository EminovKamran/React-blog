import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

import { fetchSignUp } from '../../api/auth';

import './SignUp.scss';

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [alert, setAlert] = useState(false);
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

  function submitForm(data) {
    setIsLoading(true);
    if (check) {
      setTimeout(() => {
        fetchSignUp({ user: data });
        setAlert(true);
        setTimeout(() => {
          history('/sign-in');
          setIsLoading(false);
        }, 2000);
      }, 3000);
    }
  }

  return (
    <>
      {alert && (
        <Alert
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '30%',
            justifyContent: 'center',
            margin: '0 auto',
            marginTop: '20px',
          }}
          severity='success'
        >
          <AlertTitle>Success</AlertTitle>
          You have created an account
        </Alert>
      )}
      <div className={`wrapper-form ${isLoading ? 'active' : ''}`}>
        <div className='form-container'>
          <span>Create new account</span>
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
          {isLoading && <LinearProgress color='secondary' />}
        </div>
      </div>
    </>
  );
}

export default SignUp;
