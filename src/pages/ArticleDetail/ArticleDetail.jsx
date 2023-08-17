import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

function ArticleDetail() {
  const articles = useSelector((state) => state.article.articles);

  const { slug } = useParams();

  const arr = articles.find((el) => el.slug === slug);

  const { title, description, createdAt, author, tagList, body } = arr;

  return (
    <div className='container'>
      <div className='article'>
        <ul className='column-one'>
          <li className='article__title'>{title}</li>
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
    </div>
  );
}

export default ArticleDetail;
