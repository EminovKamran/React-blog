import './Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='wrapper-header'>
      <div className='header'>
        <Link to='/'>
          <span className='header__logo'>Real world Blog</span>
        </Link>
        <div className='nav'>
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
        </div>
      </div>
    </div>
  );
}
