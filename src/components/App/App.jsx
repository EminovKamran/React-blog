import { Routes, Route } from 'react-router-dom';

import ArticlesList from '../ArticleList';
import Header from '../Header';
import ArticleDetail from '../../pages/ArticleDetail';

import './App.scss';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesList />} />
        <Route path='/article/:slug' element={<ArticleDetail />} />
      </Routes>
    </div>
  );
}
