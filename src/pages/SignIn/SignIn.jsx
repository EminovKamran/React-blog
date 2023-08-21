import { useForm } from 'react-hook-form';

import { fetchSignIn } from '../../api/auth';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const getErrorMessage = (field) => {
    if (errors[field]) {
      return <span style={{ color: 'red' }}>{errors[field].message}</span>;
    }
    return null;
  }; /// вынести в отдельный файл

  return (
    <div className='wrapper-form'>
      <div className='form-container sign-up'>
        <span className='form__name'>Sign In</span>
        <form
          className='form'
          onSubmit={handleSubmit((data) => fetchSignIn({ user: data }))}
        >
          <label className='form__label'>Email address</label>
          <input
            {...register('email', {
              required: 'input empty',
            })}
            type='email'
            className='form__input'
            placeholder='Email address'
          />
          {getErrorMessage('email')}
          <label className='form__label'>Password</label>
          <input
            {...register('password', {
              required: 'input empty',
            })}
            type='password'
            className='form__input'
            placeholder='Password'
          />
          {getErrorMessage('password')}
          <input
            className='button'
            type='submit'
            value={isSubmitting ? 'Loading...' : 'Login'}
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
