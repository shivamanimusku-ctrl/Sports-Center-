
import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MatchActions, MatchState } from "./reducer";

const MatchStateContext = createContext<MatchState | undefined>(undefined);
const MatchDispatchContext = createContext<React.Dispatch<MatchActions> | undefined>(undefined);

export const useMatchState = () => {
  const context = useContext(MatchStateContext);
  if (context === undefined) {
    throw new Error("useMatchState must be used within a MatchProvider");
  }
  return context;
};

export const useMatchDispatch = () => {
  const context = useContext(MatchDispatchContext);
  if (context === undefined) {
    throw  new Error("useMatchDispatch must be used within a MatchProvider");
  }
  return context;
};

export const MatchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MatchStateContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>{children}</MatchDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};
