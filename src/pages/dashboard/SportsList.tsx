import React, { useEffect, useState } from 'react';
import { useSportsState, useSportsDispatch } from '../../context/sports/context';
import { fetchSports } from '../../context/sports/actions';

const SportsList: React.FC = () => {
  const sportsState = useSportsState();
  const sportsDispatch = useSportsDispatch();

  const { sports, isLoading, isError, errorMessage } = sportsState;

  // State to store the selected sport
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  useEffect(() => {
    fetchSports(sportsDispatch);
  }, [sportsDispatch]);

  if (sports.length === 0 && isLoading) {
    return <span>Loading sports...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Function to set the selected sport
  const selectSport = (sportName: string) => {
    setSelectedSport(sportName);
  };

  return (
    <div className="sticky">
      <div className="flex space-x-3" style={{ color: 'black' }}>
        <button
          className="py-2 px-4 rounded-full bg-gray-100"
          onClick={() => selectSport("")} // Clear the selected sport
        >
          Trending
        </button>
        {sports.map((sport: any) => (
          <button
            key={sport.id}
            className={`py-2 px-4 rounded-full bg-gray-100 ${
              selectedSport === sport.name ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => selectSport(sport.name)} // Set the selected sport
          >
            {sport.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportsList;
