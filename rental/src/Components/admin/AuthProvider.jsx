import { createContext,useContext,useState } from "react";
import { useNavigate } from 'react-router-dom';


const AuthContext=createContext()
export const useAuth=()=>(
    useContext(AuthContext)
)


export const AuthProvider=({children})=>{
    const [tenants, setTenants] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [user, setUser] = useState(null);
    const [isAuthorized,setAuthorized]=useState(false)
    const navigate = useNavigate();
    const [foodCategoriesClient,setFoodCategoriesClient]=useState([])
    const [foodItemsClient, setFoodItemsClient] = useState([
   
    ]);

    const login = (refresh,access) => {
        localStorage.setItem('access',access)
        localStorage.setItem('refresh',refresh)
        setAuthorized(true)
        navigate('/Admin'); 
    };
    
    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setUser(null); 
        setAuthorized(false)
        navigate('/login'); 
    };

    return (
        <AuthContext.Provider value={{ user,foodItemsClient,setFoodItemsClient,foodCategoriesClient,setFoodCategoriesClient,setUser, login,isAuthorized, logout }}>
            {children}
        </AuthContext.Provider>
    )
}