import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import uniqid from 'uniqid';

import { fetchArticle } from '../../api/articles';

import './ArticleDetail.scss';

function ArticleDetail() {
  const [articleDetail, setArticleDetail] = useState();
  const user = useSelector((state) => state.user.user);

  const { slug } = useParams();

  useEffect(() => {
    fetchArticle(slug).then((body) => setArticleDetail(body));
  }, [slug]);

  if (!articleDetail) {
    return <LinearProgress color='secondary' />;
  }

  const { title, description, createdAt, author, tagList, body } =
    articleDetail.article;

  const viewButton = author.username === user.username;

  return (
    <div className='container'>
      <div className='article-detail'>
        <section className='article-detail__row-one'>
          <ul className='article-detail__row-one-box'>
            <li className='article__title'>
              <h5>{title}</h5>
            </li>
            <li className='article__tag'>
              {tagList.map((item) => (
                <span key={uniqid()} className='tag-name'>
                  {item}
                </span>
              ))}
            </li>
          </ul>
          <ul className='article-detail__row-one'>
            <div className='article-detail__box'>
              <li className='article__username'>{author.username}</li>
              <li className='article__date'>
                {format(parseISO(createdAt), 'MMMM d, y')}
              </li>
            </div>
            <div>
              <img src={author.image} alt='' className='article__img' />
            </div>
          </ul>
        </section>
        <section className='article-detail__row-two'>
          {description}
          {viewButton && (
            <div className='article-detail__row-two-box'>
              <Link to={`/articles/${slug}/edit`}>
                <button type='button' className='article-button-edit'>
                  Edit
                </button>
              </Link>
              <button className='article-button-delete' type='button'>
                Delete
              </button>
            </div>
          )}
        </section>
        <section className='article-detail__row-three'>
          <ReactMarkdown>{body}</ReactMarkdown>
        </section>
        <ul className='column-two' />
      </div>
    </div>
  );
}

export default ArticleDetail;
