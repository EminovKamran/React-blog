import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArticlesList from '../ArticleList';
import Header from '../Header';
import ArticleDetail from '../../pages/ArticleDetail';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';
import EditProfilePage from '../../pages/EditProfilePage';
import { fetchGetProfile } from '../../api/user';
import { loginAction, setUser } from '../../store/reducers/userReducer';

import './App.scss';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const StorageTokenAuth = JSON.parse(localStorage.getItem('currentUser'));
      if (StorageTokenAuth !== null) {
        const getCurrUserHandler = async () => {
          const currentUser = await fetchGetProfile(StorageTokenAuth);
          if (currentUser) {
            dispatch(loginAction(true));
            dispatch(setUser(currentUser.user));
          }
        };
        getCurrUserHandler();
      }
    }
  }, [dispatch, user]);

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesList />} />
        <Route path='/article/:slug' element={<ArticleDetail />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}
