import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { fetchSignIn } from '../../api/user';
import { loginAction, setUser } from '../../store/reducers/userReducer';

import './SignIn.scss';

function SignIn() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const getErrorMessage = (field) => {
    if (errors[field]) {
      return <span style={{ color: 'red' }}>{errors[field].message}</span>;
    }
    return null;
  }; /// вынести в отдельный файл

  async function submitForm(data) {
    setIsLoading(true);
    const responseIn = await fetchSignIn({ user: data });
    if (responseIn.user) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(responseIn.user.token),
      );
      dispatch(setUser(responseIn.user));
      dispatch(loginAction(true));
      setAlert(false);
      history('/');
    } else {
      setAlert(true);
      reset();
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <LinearProgress color='secondary' />}
      {alert && (
        <Stack
          sx={{
            width: '50%',
            display: 'flex',
            margin: '0 auto',
            marginTop: '20px',
          }}
          spacing={2}
        >
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            email or password is incorrect — <strong>try again!</strong>
          </Alert>
        </Stack>
      )}
      <div className='wrapper-form'>
        <div className='form-container sign-up'>
          <span className='form__name'>Sign In</span>
          <form className='form' onSubmit={handleSubmit(submitForm)}>
            <label className='form__label'>Email address</label>
            <input
              {...register('email')}
              type='email'
              className='form__input'
              placeholder='Email address'
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                e.target.value !== '' && setAlert(false);
              }}
            />
            {getErrorMessage('email')}
            <label className='form__label'>Password</label>
            <input
              {...register('password')}
              type='password'
              className='form__input'
              placeholder='Password'
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                e.target.value !== '' && setAlert(false);
              }}
            />
            {getErrorMessage('password')}
            <input
              className='button'
              type='submit'
              value={isSubmitting ? 'Loading...' : 'Login'}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
