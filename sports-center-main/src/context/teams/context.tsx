

import React, { createContext, useContext, useReducer } from 'react';
import { reducer, initialState, TeamsActions, TeamsState } from './reducer';

const TeamsStateContext = createContext<TeamsState | undefined>(undefined);
type TeamDispatch = React.Dispatch<TeamsActions>;
const TeamsDispatchContext = createContext<TeamDispatch| undefined>(undefined);

// export const useTeamsState = () => {
//   const context = useContext(TeamsStateContext);
//   if (context === undefined) {
//     throw new Error('useTeamsState must be used within a TeamsProvider');
//   }
//   return context;
// };

// export const useTeamsDispatch = () => {
//   const context = useContext(TeamsDispatchContext);
//   if (context === undefined) {
//     throw new Error('useTeamsDispatch must be used within a TeamsProvider');
//   }
//   return context;
// };

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TeamsStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>{children}</TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};

export const useTeamsState = () => useContext(TeamsStateContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);