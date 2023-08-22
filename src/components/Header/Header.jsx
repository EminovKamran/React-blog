import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginAction } from '../../store/reducers/userReducer';

import './Header.scss';

export default function Header() {
  const dispatch = useDispatch();
  const isLogIn = useSelector((state) => state.user.isLogIn);
  const user = useSelector((state) => state.user.user);

  const handleLogOut = () => {
    dispatch(loginAction(false));
    localStorage.removeItem('currentUser');
  };

  return (
    <div className='wrapper-header'>
      <div className='header'>
        <Link to='/'>
          <span className='header__logo'>Real world Blog</span>
        </Link>
        <div className='nav'>
          {isLogIn && (
            <>
              <Link to='/edit-profile-page'>
                <button
                  style={
                    isLogIn && {
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '10px',
                    }
                  }
                  className='nav__item'
                  type='button'
                >
                  {user.username}
                  <img src={user.image} alt='user_image' />
                </button>
              </Link>
              <Link to='/' onClick={handleLogOut}>
                <button className='nav__item' type='button'>
                  Log Out
                </button>
              </Link>
            </>
          )}
          {!isLogIn && (
            <>
              <Link to='/sign-in'>
                <button className='nav__item' type='button'>
                  Sign In
                </button>
              </Link>
              <Link to='/sign-up'>
                <button className='nav__item' type='button'>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
