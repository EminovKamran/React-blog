import './Header.scss';

export default function Header() {
  return (
    <div className='wrapper'>
      <div className='header'>
        <span className='header__logo'>Real world Blog</span>
        <div className='nav'>
          <button className='nav__item' type='button'>
            Sign In
          </button>
          <button className='nav__item' type='button'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
