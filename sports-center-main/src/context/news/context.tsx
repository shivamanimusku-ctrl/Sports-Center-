import React, { createContext, useContext, useReducer } from "react";
import { reducer , initialState, NewsActions, NewsState} from "./reducer"

// Define the news article structure

const NewsStateContext = createContext<NewsState | undefined>(undefined);
const NewsDispatchContext = createContext<React.Dispatch<NewsActions> | undefined>(undefined);

export const useNewsState = () => {
  const context = useContext(NewsStateContext);
  if (context === undefined) {
    throw new Error("useNewsState must be used within a NewsProvider");
  }
  return context;
};

export const useNewsDispatch = () => {
  const context = useContext(NewsDispatchContext);
  if (context === undefined) {
    throw new Error("useNewsDispatch must be used within a NewsProvider");
  }
  return context;
};

export const NewsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewsStateContext.Provider value={state}>
      <NewsDispatchContext.Provider value={dispatch}>{children}</NewsDispatchContext.Provider>
    </NewsStateContext.Provider>
  );
};

