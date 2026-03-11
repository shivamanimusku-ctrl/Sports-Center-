import React, { useEffect, useState } from 'react';
import { useNewsState, useNewsDispatch } from '../../context/news/context';
import { fetchNewsArticles } from '../../context/news/actions';
import { useSportsState, useSportsDispatch } from '../../context/sports/context';
import { fetchSports } from '../../context/sports/actions';
import { API_ENDPOINT } from '../../config/constants';
import { Link } from 'react-router-dom';
import { usePreferencesState,usePreferencesDispatch } from '../../context/preferences/context';
import { fetchPreferences } from '../../context/preferences/actions';


const SportTeamFilter: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('authToken')
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();
  const preferencesState:any = usePreferencesState();
  const preferencesDispatch=usePreferencesDispatch();
  const { preferences} = preferencesState;
  console.log(preferences)
  const { articles, isLoading, isError, errorMessage } = newsState;
  let { sports } = sportsState;
  console.log(preferences)

  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  let [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    fetchNewsArticles(newsDispatch);
    fetchSports(sportsDispatch);
    fetchPreferences(preferencesDispatch)
  }, [newsDispatch, sportsDispatch]);

  useEffect(() => {
    const getTeams = async () => {
      if (selectedSport) {
        const token = localStorage.getItem('authToken') ?? '';
        try {
          const response = await fetch(`${API_ENDPOINT}/teams`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          const sportTeams = data.filter((team: any) => team.plays === selectedSport);
          setTeams(sportTeams);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      }
    };
    getTeams();
  }, [selectedSport]);

  const filterArticles = () => {
    if (selectedSport === '' || selectedTeam === '') {
      return articles;
    }

    const filteredArticles = articles.filter((article: any) => {
      return article.sport.name === selectedSport && article.teams.some((team: any) => team.name === selectedTeam);
    });

    return filteredArticles;
  };

  console.log(preferences);
  console.log(teams)
  if(isAuthenticated){
    if(preferences && preferences.sports && preferences.teams ){
      if(preferences.sports.length>0){
        sports=sports.filter((sport:any)=>preferences.sports.includes(sport.name))
      }
      
    }
  }

  return (
    <div className="p-5 border border-gray-100 shadow-sm rounded-md w-1/4 mr-0 ml-2 mb-10 px-0 end-4 absolute">
      {/* Options box on the right */}
      <h1 style={{ color: "black" }} className="mb-4 mt-0 font-semibold">
        Favourite sports
      </h1>
      <div className="w-3/4 ml-2 mb-2">
        <div className="sticky mb-6">
          <div className="flex flex-col space-y-4">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Sport</option>
              {sports.map((sport: any) => (
                <option key={sport.id} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Team</option>
              {teams.map((team: any) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Display articles on the left */}
      <div className="w-full max-h-[980px] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {filterArticles().length === 0 && isLoading ? (
          <span>Loading...</span>
        ) : isError ? (
          <span>{errorMessage}</span>
        ) : (
          filterArticles().map((article: any) => (
            <div
              key={article.id}
              className="w-full h-100 flex items-center mb-4 mr-10 right-0.5 border-4 border-black-400 rounded-xl p-4"
            >
              <div className="w-4/4">
              <div className="flex flex-center">
                <img src={article.thumbnail} alt={article.title} className="w-full" />
              </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-600">{article.summary}</p>
                <Link to={`/account/dashboard/articles/${article.id}`} className="text-center text-blue-500 block mt-0">
                  Read more
                </Link>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SportTeamFilter;
