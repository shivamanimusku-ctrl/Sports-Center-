export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: { id: number; name: string }[];
  score: { [teamName: string]: string };
  startsAt:string;
  story:string
}


  
  export interface MatchState {
    matches: Match[];
    selectedMatch: Match | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
  
  export const initialState: MatchState = {
    matches: [],
    selectedMatch: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  };
  
  export type MatchActions =
    | { type: "FETCH_MATCHES_REQUEST" }
    | { type: "FETCH_MATCHES_SUCCESS"; payload: Match[] }
    | { type: "FETCH_MATCHES_FAILURE"; payload: string }
    | { type: "SELECT_MATCH"; payload: Match | null };
  
  export const reducer = (state: MatchState = initialState, action: MatchActions): MatchState => {
    switch (action.type) {
      case "FETCH_MATCHES_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
      case "FETCH_MATCHES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          matches: action.payload,
        };
      case "FETCH_MATCHES_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      case "SELECT_MATCH":
        return {
          ...state,
          selectedMatch: action.payload,
        };
      default:
        return state;
    }
  };
  