import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            const response = await fetch("http://iotdog-alerts.cloudns.be/api/authenticate.php", {
                method: "POST",
                body: formData,
            });
            const res = await response.json();
            if (res.data) {
                setUser(JSON.stringify(res.data.user));
                setToken(res.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("site", res.token);
                navigate("/");
                return;
            }
            throw new Error(res.message);
        } catch(error) {
            console.error(error);
            const errorDisplay = document.getElementById("login-error");
            errorDisplay.innerHTML = "Wrong username or password";
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{token, user, loginAction, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}