interface Sport {
    id: number;
    name: string;
    description: string;
    // Add other properties of the sport
  }
  
  export interface SportsState {
    sports: Sport[];
    selectedSport: Sport | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
  
  export const initialState: SportsState = {
    sports: [],
    selectedSport: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  };
  
  export type SportsActions =
    | { type: "FETCH_SPORTS_REQUEST" }
    | { type: "FETCH_SPORTS_SUCCESS"; payload: Sport[] }
    | { type: "FETCH_SPORTS_FAILURE"; payload: string }
    | { type: "SELECT_SPORT"; payload: Sport | null };
  
  export const reducer = (state: SportsState = initialState, action: SportsActions): SportsState => {
    switch (action.type) {
      case "FETCH_SPORTS_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
      case "FETCH_SPORTS_SUCCESS":
        return {
          ...state,
          isLoading: false,
          sports: action.payload,
        };
      case "FETCH_SPORTS_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      case "SELECT_SPORT":
        return {
          ...state,
          selectedSport: action.payload,
        };
      default:
        return state;
    }
  };
  