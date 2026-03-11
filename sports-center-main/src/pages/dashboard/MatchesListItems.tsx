import React, { useEffect, useState } from 'react';
import { useMatchState, useMatchDispatch } from '../../context/matches/context';
import { fetchNewMatches } from '../../context/matches/actions';
import { API_ENDPOINT } from '../../config/constants';
import { Link } from 'react-router-dom';
import { usePreferencesState, usePreferencesDispatch } from '../../context/preferences/context';
import { fetchPreferences } from '../../context/preferences/actions';

type Match = {
  id: number;
  score: any;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: { id: number; name: string }[];
};

const MatchesListItems: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const matchesState = useMatchState();
  const matchesDispatch = useMatchDispatch();
  const [isRotated, setIsRotated] = useState(false);
  const preferencesState: any = usePreferencesState();
  const preferencesDispatch = usePreferencesDispatch();
  const { preferences, isLoading: preferencesLoading, isError: preferencesError, errorMessage: preferencesErrorMessage } = preferencesState;
  const { matches, isLoading, isError, errorMessage } = matchesState;

  useEffect(() => {
    fetchNewMatches(matchesDispatch);
    fetchPreferences(preferencesDispatch);
  }, []);

  let [runningMatchesWithScores, setRunningMatchesWithScores] = useState<Match[]>([]);
  let [latestMatchesWithScores, setLatestMatchesWithScores] = useState<Match[]>([]);

  const handleRefreshClick = () => {
    setIsRotated(!isRotated);
    fetchNewMatches(matchesDispatch);
  };
  const fetchScoresForMatch = async (matchId: number): Promise<Match | null> => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
      const matchData = await response.json();
      return {
        ...matchData,
        id: matchId,
      };
    } catch (error) {
      console.error('Error fetching scores:', error);
      return null;
    }
  };

  useEffect(() => {
    

    const fetchScoresForRunningMatches = async () => {
      const runningMatches = matches.filter((match) => match.isRunning);

      const matchesWithScores = await Promise.all(
        runningMatches.map(async (match) => {
          const scores = await fetchScoresForMatch(match.id);
          if (scores !== null) {
            match.score = scores.score;
          }
          return match;
        })
      );

      setRunningMatchesWithScores(matchesWithScores);
    };

    fetchScoresForRunningMatches();
  }, [matches]);
  const getLast5Matches = (matches: Match[], excludeRunningMatches: boolean = false) => {
    // Filter out running matches if specified
    const filteredMatches = excludeRunningMatches ? matches.filter(match => !match.isRunning) : matches;
  
    // Sort matches by date in descending order
    const sortedMatches = filteredMatches.sort((a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime());
  
    // Get the last 5 matches
    const last5Matches = sortedMatches.slice(0, 5);
  
    return last5Matches;
  };
  
  
  // Assuming matches is an array of Match objects
  let last5Matches:any = getLast5Matches(matches,true);
  

  useEffect(() => {
  

      
    const fetchScoresForLatestMatches = async () => {
      if (isAuthenticated){
      if(preferences && preferences.sports|| preferences.teams) {
        if(preferences.sports.length>0 || preferences.teams.length>0){
          last5Matches=preferredmatches.slice(0,5)
        }

      // } preferredmatches.slice(0, 5) : last5Matches;
      }
    }

      const matchesWithScores = await Promise.all(
        last5Matches.map(async (match:any) => {
          const scores = await fetchScoresForMatch(match.id);
          if (scores !== null) {
            match.score = scores.score;
          }
          return match;
        })
      );

      setLatestMatchesWithScores(matchesWithScores);
    };

    fetchScoresForLatestMatches();
  }, [matches]);

  if (preferencesLoading) {
    return <span>Loading preferences...</span>;
  }

  if (preferencesError) {
    return <span>{preferencesErrorMessage}</span>;
  }

  if (matches.length === 0 && isLoading) {
    return <span className='text-black-600'>Loading matches...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const preferredmatches = matches.filter((match) => {
    if(preferences && (preferences.sports || preferences.teams)){
    const sportinpreferences = preferences && preferences.sports.includes(match.sportName);
    const teaminpreferences = match.teams.some((team) => preferences && preferences.teams.includes(team.name));

    return sportinpreferences || teaminpreferences;
    }
  });
  if (isAuthenticated) {
    if (preferences &&( preferences.sports|| preferences.teams)) {
      if(preferences.sports.length>0 || preferences.teams.length>0){
      runningMatchesWithScores = runningMatchesWithScores.filter((match: Match) => {
      
        const sportInPreferences = preferences.sports.includes(match.sportName);
        const teamsInPreferences = match.teams.some((team) => preferences.teams.includes(team.name));

        return sportInPreferences || teamsInPreferences;
      
    });
  }
  }
  }

  return (
    <div className="p-5 border border-gray-100 shadow-sm rounded-md w-screen mt-0 mb-4 relative">
      <h2 className="text-2xl font-semibold   text-blue-800 mb-4 mr-10">Live Matches</h2>
      <button
        className="w-8 h-8 p-1   text-white rounded-full absolute top-5 mx-14 z-10 transform transition-transform"
        onClick={handleRefreshClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.0"
          stroke="gray"
          aria-hidden="true"
          className={`w-6 h-6 mx-auto transform ${isRotated ? 'rotate-180' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </button>

      <div className="flex flex-row space-x-4 h-45 w-92">
        {runningMatchesWithScores.map((match: Match) => (
          <div key={match.id}>
            <div className="h-45 w-92">
              <Link to={`/account/dashboard/${match.id}`}>
                <div className="border p-2  w-100 rounded-md hover:shadow-md bg-white shadow-md transition duration-300">
                  <div className="mb-4 w-full">
                    <h1 className="text-2xl font-semibold text-blue-800 uppercase antialiased">
                      {match.sportName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      <p className="text-green-500">Live</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 text-black">
                      <div className="text-lg font-semibold text-indigo-600 mr-16 text-left">
                        {match.teams[0].name}
                        <div className="mt-4 text-left">{match.teams[1].name}</div>
                      </div>
                      <div className="text-lg font-bold text-green-600 text-right">
                        {match.score && match.score[match.teams[0].name]}
                        <div className="mt-4">{match.score && match.score[match.teams[1].name]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        ></path>
                      </svg>
                      {match.location}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold text-blue-800 mt-4 mb-4 mr-10">Most Recent Matches</h2>

      {/* <button
        className="w-8 h-8 p-1 bg-white-800 text-white rounded-full absolute top-0 right-2 z-10 transform transition-transform"
        onClick={handleRefreshClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          aria-hidden="true"
          className={`w-6 h-6 mx-auto transform ${isRotated ? 'rotate-180' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </button> */}

      <div className="flex flex-row space-x-4 h-46 w-92 relative">
        {latestMatchesWithScores.map((match: Match) => (
          <div key={match.id}>
            <div className="h-45 w-92">
              <Link to={`/account/dashboard/${match.id}`}>
                <div className="border p-2 h-100 w-100 rounded-md hover:shadow-md bg-white shadow-md transition duration-300">
                  <div className="mb-4 w-full">
                    <h1 className="text-xl font-semibold text-blue-800 uppercase antialiased">
                      {match.sportName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <p className="text-gray-500">Live</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 text-black">
                      <div className="text-lg font-semibold text-indigo-600 mr-16 text-left">
                        {match.teams[0].name}
                        <div className="mt-4 text-left">{match.teams[1].name}</div>
                      </div>
                      <div className="text-lg font-bold text-green-600 text-right">
                        {match.score && match.score[match.teams[0].name]}
                        <div className="mt-4">{match.score && match.score[match.teams[1].name]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        ></path>
                      </svg>
                      {match.location}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MatchesListItems;
