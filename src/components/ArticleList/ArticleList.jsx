import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import uniqid from 'uniqid';

import Article from '../Article';
import { fetchArticles } from '../../api/articles';
import {
  selectArticles,
  selectArticlesCount,
} from '../../store/selectors/selectors';

import './ArticleList.scss';

export default function ArticlesList() {
  const dispatch = useDispatch();

  const articles = useSelector(selectArticles);
  const articlesCount = useSelector(selectArticlesCount);
  const totalPages = Math.ceil(articlesCount / 5);

  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);

  const token = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchArticles((offset - 1) * 5, token)).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch, offset, token]);

  if (isLoading) {
    return <LinearProgress color='secondary' />;
  }

  return (
    <div className='container'>
      {articles.map((item) => (
        <Article key={uniqid()} item={item} />
      ))}
      <Pagination
        count={totalPages}
        page={offset}
        variant='outlined'
        shape='rounded'
        color='secondary'
        onChange={(_, page) => setOffset(page)}
      />
    </div>
  );
}
