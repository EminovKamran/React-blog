import { addArticlesAction } from '../store/reducers/articleReducer';

// eslint-disable-next-line import/prefer-default-export
export function fetchArticles(offset) {
  return (dispatch) =>
    fetch(`https://blog.kata.academy/api/articles?offset=${offset}&limit=5`)
      .then((response) => response.json())
      .then((json) => dispatch(addArticlesAction(json)));
}
