import { Children, createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user,setUser]=useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services,setServices]=useState([]);
    const authorizationToken=`Bearer ${token}`;

const API=import.meta.env.APP_URI_API;

const storeTokenInLS=(serverToken)=>{
    setToken(serverToken);
    return localStorage.setItem("token",serverToken);
};

let isLoggedIn=!!token;
//tackling logout user
const LogoutUser=()=>{
    setToken("");
    return localStorage.removeItem("token");


};
//Jwt authentication to get the currently logged in user
const userAuthentication = async () =>{
    try{
        setIsLoading(true);
        const response=await fetch(`${API}/user`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(response.ok){
            const data=await response.json();
            console.log("user data",data.userData);
            setUser(data.userData);
            setIsLoading(false);
        }
        else{
            setIsLoading(false);
        }
    }
    catch(error){
        console.log("Error fetching user data");
    }
};

//to fetch the services from database
const getServices=async()=>{
    try{
        const response=await fetch(`${API}/data/service`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },

        });
        if(response.ok){
            const data=await response.json();
            console.log(data.msg);
            setServices(data.msg);
        }
        else{
            console.error(`Error fetching services:${response.status} ${response.statusText}`)
        }
    }
    catch(error){
        console.log(`services frontend error: ${error}`);
    }
};

useEffect(()=>{
    getServices();
    userAuthentication();
},[]);



    return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services,authorizationToken,isLoading,API}}>
        {children}
        </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;

}