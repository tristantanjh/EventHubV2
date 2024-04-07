import React, {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

//create a context on global scope
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [fullList, setFullList] = useState([]);

  const onSearch = (query) => {
    // console.log(query);
    // console.log(eventList);
    const filteredEvents = fullList.slice().filter((event) => {
      return event.title.toLowerCase().includes(query.toLowerCase());
    });

    setEventList(filteredEvents);
  };

  //useMemo to improve performance
  const value = useMemo(
    () => ({
      eventList,
      setFullList,
      setEventList,
      onSearch,
    }),
    [eventList, setEventList, onSearch]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
