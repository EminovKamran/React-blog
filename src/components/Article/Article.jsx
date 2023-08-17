import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import './Article.scss';

export default function Article({ item }) {
  const {
    title,
    author,
    description,
    tagList,
    createdAt,
    favoritesCount,
    body,
    slug,
  } = item;

  return (
    <div className='article'>
      <ul className='column-one'>
        <Link to={`/article/${slug}`}>
          <li className='article__title'>{`${title} - like: ${favoritesCount}`}</li>{' '}
        </Link>
        <li className='article__tag'>
          {/* eslint-disable-next-line no-shadow */}
          {tagList.map((item) => (
            <li className='tag-name'>{item}</li>
          ))}
        </li>
        <li className='article__description'>{description}</li>
        <li className='article__body'>
          <ReactMarkdown>{body}</ReactMarkdown>
        </li>
      </ul>
      <ul className='column-two'>
        <ul className='column-box'>
          <li className='article__username'>{author.username}</li>
          <li className='article__date'>
            {format(parseISO(createdAt), 'MMMM d, y')}
          </li>
        </ul>
        <img src={author.image} alt='' className='article__img' />
      </ul>
    </div>
  );
}
