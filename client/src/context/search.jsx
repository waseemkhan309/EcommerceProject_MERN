import { useState, createContext, useContext } from "react";

const SearchContext = createContext();
// eslint-disable-next-line react/prop-types
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};
// custom hook
const useSearch = () => useContext(SearchContext);
// eslint-disable-next-line 
export { useSearch, SearchProvider }

