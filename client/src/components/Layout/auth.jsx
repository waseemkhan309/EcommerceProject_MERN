import { useState,createContext, useContext } from "react";
const AuthContext = createContext();    
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) =>{
    const [auth,setAuth] = useState({
        user: null,
        token:"",
    });
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            { children }
        </AuthContext.Provider>
    );
};
// custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth,AuthProvider}

