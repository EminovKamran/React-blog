import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import uniqid from 'uniqid';

import Article from '../Article';
import { fetchArticles } from '../../api/articles';
import './ArticleList.scss';

export default function ArticlesList() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.article.articles);
  const articlesCount = useSelector((state) => state.article.articlesCount);
  const totalPages = Math.ceil(articlesCount / 5);

  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchArticles((offset - 1) * 5)).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch, offset]);

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
