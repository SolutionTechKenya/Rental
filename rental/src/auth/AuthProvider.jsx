import { createContext,useContext,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


const AuthContext=createContext()
export const useAuth=()=>(
    useContext(AuthContext)
)

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthorized,setAuthorized]=useState(false)
    const navigate = useNavigate();


    // const login = (refresh,access) => {
    //     localStorage.setItem('access',access)
    //     localStorage.setItem('refresh',refresh)
    //     setAuthorized(true)
    //     navigate('/Admin'); 
    // };
    
    // const logout = () => {
    //     localStorage.removeItem(ACCESS_TOKEN)
    //     localStorage.removeItem(REFRESH_TOKEN)
    //     setUser(null); 
    //     setAuthorized(false)
    //     navigate('/login'); 
    // };

    return (
        <AuthContext.Provider value={{ user,foodItemsClient,setFoodItemsClient,foodCategoriesClient,setFoodCategoriesClient,setUser, login,isAuthorized, logout }}>
            {children}
        </AuthContext.Provider>
    )
}