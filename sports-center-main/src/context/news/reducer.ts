interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  content: string;
  date: string;
  teams: { id: number; name: string }[]; // Array of team objects
  sport: { id: number; name: string }; // Sport object
}

  
  export interface NewsState {
    articles: NewsArticle[];
    selectedArticle: NewsArticle | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
  
  export const initialState: NewsState = {
    articles: [],
    selectedArticle: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  };
  
  export type NewsActions =
    | { type: "FETCH_ARTICLES_REQUEST" }
    | { type: "FETCH_ARTICLES_SUCCESS"; payload: NewsArticle[] }
    | { type: "FETCH_ARTICLES_FAILURE"; payload: string }
    | { type: "SELECT_ARTICLE"; payload: NewsArticle | null };
  
  export const reducer = (state: NewsState = initialState, action: NewsActions): NewsState => {
    switch (action.type) {
      case "FETCH_ARTICLES_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
      case "FETCH_ARTICLES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          articles: action.payload,
        };
      case "FETCH_ARTICLES_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      case "SELECT_ARTICLE":
        return {
          ...state,
          selectedArticle: action.payload,
        };
      default:
        return state;
    }
  };