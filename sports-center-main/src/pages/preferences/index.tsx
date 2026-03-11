import React from "react";
import PreferenceListItems from "./PreferenceListItems";

const Preferences = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          User Preferences
        </h2>
      </div>
      <PreferenceListItems />
    </>
  );
};

export default Preferences;