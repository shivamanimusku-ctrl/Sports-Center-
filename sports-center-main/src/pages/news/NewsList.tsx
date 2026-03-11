import React from 'react';
import NewsListItems from './NewsListItems';
// import { useNewsState, useNewsDispatch } from '../news/context';
// import { fetchNewsArticles } from '../news/actions';

const NewsList: React.FC = () => {

  return (
    <div className="grid gap-10 grid-cols-0 mt-4">
     <NewsListItems />
    </div>
  );
};

export default NewsList;
