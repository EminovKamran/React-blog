import { addArticlesAction } from '../store/reducers/articleReducer';

export function fetchArticles(offset) {
  return (dispatch) =>
    fetch(`https://blog.kata.academy/api/articles?offset=${offset}&limit=5`)
      .then((response) => response.json())
      .then((json) => dispatch(addArticlesAction(json)));
}

export async function fetchArticle(slug) {
  const response = await fetch(
    `https://blog.kata.academy/api//articles/${slug}`,
  );
  const json = await response.json();
  return json;
}

export async function fetchArticleCreate(data, token) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    'https://blog.kata.academy/api/articles',
    options,
  );

  const json = await response.json();
  return json;
}

export async function fetchEditArticle(data, token, slug) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}`,
    options,
  );

  const json = await response.json();
  return json;
}
