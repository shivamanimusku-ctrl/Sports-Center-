import React from 'react';
import MatchesListItems from './MatchesListItems';


const MatchesList: React.FC = () => {
  return (
    <div className="grid gap-10 grid-cols-0 mt-4">
      <MatchesListItems />
    </div>
  );
};

export default MatchesList;
