import { AuthContext } from "../context/AuthContext";
import usePersistedState from "../hooks/usePersistedState";


const AuthProvider = ({children}) => {
    const [userData, setUserData] = usePersistedState("user", {});


    const userLogin = (data) => {
        setUserData({user_id: data._id, token: data.accessToken});
    }

    const userLogout = () => {
        setUserData({});
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{...userData, userLogin, userLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;