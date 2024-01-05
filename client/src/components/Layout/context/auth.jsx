import { useState,createContext,useEffect, useContext } from "react";
const AuthContext = createContext();    
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) =>{
    const [auth,setAuth] = useState({
        user: null,
        token:"",
    });
    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            });
        } 
    },[]);

    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            { children }
        </AuthContext.Provider>
    );
};
// custom hook
const useAuth = () => useContext(AuthContext);
// eslint-disable-next-line react-refresh/only-export-components
export { useAuth , AuthProvider}
 
