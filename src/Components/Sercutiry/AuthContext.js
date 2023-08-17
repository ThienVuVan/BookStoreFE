import { createContext, useContext, useState } from "react";

// create context
export let AuthContext = createContext();
// get context to use
export let useAuth = () => useContext(AuthContext);

// share context with other component
function AuthProvider({ children }) {
    let [isAuthenticated, setAuthenticated] = useState(false);
    let [username, setUsername] = useState(null);
    let [token, setToken] = useState(null);
    let [refreshToken, setRefreshToken] = useState(null);

    let logout = () => {
        setAuthenticated(false);
        setUsername(null)
        setToken(null)
        setRefreshToken(null)
    }
    return (
        // set things in to context
        <AuthContext.Provider value={{
            isAuthenticated, username, token, refreshToken,
            logout, setAuthenticated, setUsername, setToken, setRefreshToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;