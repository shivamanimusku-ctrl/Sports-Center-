
import { API_ENDPOINT } from "../../config/constants";

import { Preferences, PreferencesDispatch } from "./reducer";
export const fetchPreferences = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";


  try {
    dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data", data);
    dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: data.preferences });
  } catch (error) {
    console.log("Error fetching Preferences:", error);
    dispatch({
      type: "FETCH_PREFERENCES_FAILURE",
      payload: "Unable to load Preferences",
    });
  }
};

export const updatePreferences = async (
  dispatch: PreferencesDispatch,
  //   projectID: string,
  preferences: Preferences
) => {
  const token = localStorage.getItem("authToken") ?? "";

 

  try {
    dispatch({ type: "UPDATE_PREFERENCES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/users/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferences),
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: "UPDATE_PREFERENCES_SUCCESS" });
    fetchPreferences(dispatch);
  } catch (error) {
    console.log("Error UPDATE Preferences:", error);
    dispatch({
      type: "UPDATE_PREFERENCES_FAILURE",
      payload: "Unable to UPDATE Preferences",
    });
  }
};