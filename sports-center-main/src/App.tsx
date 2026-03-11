import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { NewsProvider } from "./context/news/context";
import { MatchProvider } from "./context/matches/context";
import React from "react";
import { SportsProvider } from "./context/sports/context";
import { PreferencesProvider } from "./context/preferences/context";
import { TeamsProvider } from "./context/teams/context";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      
      <MatchProvider>
        <NewsProvider>
          <SportsProvider>
          <TeamsProvider>
      <PreferencesProvider>
          <RouterProvider router={router} />
          </PreferencesProvider>
      </TeamsProvider>
          </SportsProvider>
        </NewsProvider>
      </MatchProvider>
      
    </div>
  );
};

export default App;