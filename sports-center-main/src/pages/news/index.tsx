import React, { Suspense } from "react";
const NewsList = React.lazy(() => import("./NewsList"));
// import NewsDeta from "./NewProject";
import ErrorBoundary from "../../components/ErrorBoundary";
// import NewsDetail from "./Newsdetail";

const News = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          News articles
        </h2>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <NewsList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};


export default News;