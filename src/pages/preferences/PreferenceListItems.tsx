import React, { Fragment,useState, useEffect } from "react";
import { useSportsState,useSportsDispatch } from "../../context/sports/context";
import {Dialog,Transition} from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useTeamsState ,useTeamsDispatch} from "../../context/teams/context";
import { usePreferencesState, usePreferencesDispatch } from "../../context/preferences/context";
// import { updatePreferences } from "../../context/preferences/actions";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";
import { fetchPreferences } from "../../context/preferences/actions";


export default function PreferenceListItems() {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string[]>([]);
  const [isOpen,setIsOpen] = useState(true)

  const sportState:any = useSportsState();
  const sportsDispatch=useSportsDispatch();
  const teamState:any = useTeamsState();
  console.log(teamState)
  const teamsDispatch=useTeamsDispatch();
  const preferencesState:any = usePreferencesState();
  const preferencesDispatch = usePreferencesDispatch();

  const { sports } = sportState;
  const { teams } = teamState;
  // const openModal = () => {
  //   setIsOpen(true);
  // };
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate('/account/dashboard');
  };
  const closeModal1=()=>{
    console.log("hey1")
    setIsOpen(false)
  }
  
  const { preferences, isLoading, isError, errorMessage } = preferencesState;
  useEffect(()=>{
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
    fetchPreferences(preferencesDispatch)
  },[])
 
  console.log(teams)
  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedSports(preferences.sports || []);
      setSelectedTeams(preferences.teams || []);
      setSelectedArticle(preferences.articles || []);
      setSelectedMatch(preferences.matches || []);
    }
  }, [preferences]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const user = localStorage.getItem("userData") ?? "";
  console.log("user", user);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    const updatedPreferences = {
      sports: selectedSports,
      teams: selectedTeams,
      articles: selectedArticle,
      matches: selectedMatch,
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          preferences: updatedPreferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update preferences: ${errorData.message}`);
      }

     closeModal()
      window.location.reload();
      // closeModal()
    } catch (error: any) {
      console.error("Failed to update preferences:", error.message);
    }
    
  }
  

  console.log(preferences);
  

  

  return (
    <>
      {/* <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Preferences
      </button> */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 bg-white" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Favorite Sport
                  </Dialog.Title>
                  <div className="mt-2 dark:text-white ">
                    <form onSubmit={handleSubmit}>
                      <div className="">
                        <div className="grid grid-cols-5 gap-3  ">
                          {sports &&
                            sports.length > 0 &&
                            sports.map((sport:any) => (
                              <div
                                key={sport.id}
                                className="flex items-center space-x-2  "
                              >
                                <input
                                  type="checkbox"
                                  id={`sport-${sport.id}`}
                                  name={`sport-${sport.id}`}
                                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  value={sport.name}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedSports((prev) =>
                                      prev.includes(value)
                                        ? prev.filter((item) => item !== value)
                                        : [...prev, value]
                                    );
                                  }}
                                  checked={selectedSports.includes(sport.name)}
                                />
                                <label
                                  htmlFor={`sport-${sport.id}`}
                                  className="text-gray-700"
                                >
                                  {sport.name}
                                </label>
                              </div>
                            ))}
                        </div>
                        <br />
                        <h1 className="text-lg font-medium leading-6 text-gray-900">
                          Favorite Teams
                        </h1>
                        <div className="grid grid-cols-4 gap-5">
                          {teams.map((team:any) => (
                            <div
                              key={team.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`team-${team.id}`}
                                name={`team-${team.id}`}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                value={team.name}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSelectedTeams((prev) =>
                                    prev.includes(value)
                                      ? prev.filter((item) => item !== value)
                                      : [...prev, value]
                                  );
                                }}
                                checked={selectedTeams.includes(team.name)}
                              />
                              <label
                                htmlFor={`team-${team.id}`}
                                className="text-gray-700"
                              >
                                {team.name}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 space-x-2">
                          <button
                            type="submit"
                            onClick={closeModal1}
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
                              }