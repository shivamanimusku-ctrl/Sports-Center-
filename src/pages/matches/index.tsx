import React, { Suspense } from "react";
const MatchesList = React.lazy(() => import("./MatchesList"));
import ErrorBoundary from "../../components/ErrorBoundary";
// import MatchesList from "./MatchesList";

const Matches = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Matches
        </h2>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Matches;
