const defaultState = {
  articles: [],
  articlesCount: null,
};

const ADD_ARTICLES = 'ADD_ARTICLES';

export default function articleReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_ARTICLES:
      return {
        ...state,
        articles: [...action.payload.articles],
        articlesCount: action.payload.articlesCount,
      };
    default:
      return state;
  }
}

export const addArticlesAction = (payload) => ({ type: ADD_ARTICLES, payload });
