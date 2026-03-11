import React, { useEffect } from 'react';
import { useMatchState, useMatchDispatch } from '../../context/matches/context';
import { fetchNewMatches } from '../../context/matches/actions';

const MatchesListItems: React.FC = () => {
  const matchesState = useMatchState();
  const matchesDispatch = useMatchDispatch();
  const { matches, isLoading, isError, errorMessage } = matchesState;
  console.log(matches)

  useEffect(() => {
    fetchNewMatches(matchesDispatch);
  }, [matchesDispatch]);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className='w-3/4'>
      {matches.map((match: any) => (
        <div key={match.id} className="w-full flex items-center mb-4 border border-gray-500 rounded p-2">
          <div className="w-3/4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{match.name}</h2>
            <p className="text-gray-600">{match.location}</p>
            <p className="text-left text-gray-500 block mt-0">{new Date(match.endsAt).toLocaleDateString()}</p>
            <a href={`/account/matches/${match.id}`} className="text-center text-blue-500 block mt-0">details</a>
          </div>
          <div className="w-1/4">
            {match.teams.map((team: any) => (
              <p key={team.id} className="text-gray-500 text-center">{team.name}</p>
            ))}
            <img src={match.thumbnail} alt={match.name} className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesListItems;
