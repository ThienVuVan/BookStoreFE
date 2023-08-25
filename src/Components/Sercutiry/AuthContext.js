import { createContext, useContext, useState } from "react";

// create context
export let AuthContext = createContext();
// get context to use
export let useAuth = () => useContext(AuthContext);

// share context with other component
function AuthProvider({ children }) {
    let [isAuthenticated, setAuthenticated] = useState(false);
    let [roles, setRoles] = useState([]);

    // handle logout
    let logout = () => {
        setAuthenticated(false);
        setRoles([])
        sessionStorage.clear()
    }

    return (
        // set things in to context
        <AuthContext.Provider value={{
            isAuthenticated, roles,
            logout, setAuthenticated, setRoles
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;