import { Routes, Route } from 'react-router-dom';

import ArticlesList from '../ArticleList';
import Header from '../Header';
import ArticleDetail from '../../pages/ArticleDetail';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';
import EditProfilePage from '../../pages/EditProfilePage';

import './App.scss';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesList />} />
        <Route path='/article/:slug' element={<ArticleDetail />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/edit-profile-page' element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}
