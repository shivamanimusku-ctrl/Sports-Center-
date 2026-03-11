import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, SportsActions, SportsState } from "./reducer";

const SportsStateContext = createContext<SportsState | undefined>(undefined);
const SportsDispatchContext = createContext<React.Dispatch<SportsActions> | undefined>(undefined);

export const useSportsState = () => {
  const context = useContext(SportsStateContext);
  if (context === undefined) {
    throw new Error("useSportsState must be used within a SportsProvider");
  }
  return context;
};

export const useSportsDispatch = () => {
  const context = useContext(SportsDispatchContext);
  if (context === undefined) {
    throw new Error("useSportsDispatch must be used within a SportsProvider");
  }
  return context;
};

export const SportsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SportsStateContext.Provider value={state}>
      <SportsDispatchContext.Provider value={dispatch}>{children}</SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  );
};
