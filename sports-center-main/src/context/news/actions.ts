import { API_ENDPOINT } from '../../config/constants';
// import { NewsActions } from './context';


export const fetchNewsArticles = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles` ,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data)
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching news articles:', error);
    dispatch({ type: "FETCH_ARTICLES_FAILURE", payload: 'Unable to load news articles' });
  }
};

export const fetchArticleById = async (dispatch: any, articleId: number) => {
  const token = localStorage.getItem('authToken') ?? '';
  try {
    dispatch({ type: 'FETCH_ARTICLES_REQUEST' });
    const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: 'SELECT_ARTICLE', payload: data });
  } catch (error) {
    console.log('Error fetching news articles:', error);
    dispatch({ type: 'FETCH_ARTICLES_FAILURE', payload: 'Unable to load news articles' });
  }
};
