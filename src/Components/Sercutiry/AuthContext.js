import { createContext, useContext, useState, useEffect } from "react";
import { GetCategoryApi } from "../API/BookStoreApi";
// create context
export let AuthContext = createContext();
// get context to use
export let useAuth = () => useContext(AuthContext);

// share context with other component
function AuthProvider({ children }) {
    let [isAuthenticated, setAuthenticated] = useState(false);
    let [roles, setRoles] = useState([]);
    let [categories, setCategories] = useState([])
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    let retrieveCategory = async () => {
        try {
            let response = await GetCategoryApi(headers)
            setCategories(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        retrieveCategory()
        // for reload windows;
        if (JSON.parse(sessionStorage.getItem("isAuthenticated")) && JSON.parse(sessionStorage.getItem("roles"))) {
            setAuthenticated(JSON.parse(sessionStorage.getItem("isAuthenticated")))
            setRoles(JSON.parse(sessionStorage.getItem("roles")))
        }
    }, [])

    // handle logout
    let logout = () => {
        setAuthenticated(false);
        setRoles([])
        sessionStorage.clear()
    }

    return (
        // set things in to context
        <AuthContext.Provider value={{
            isAuthenticated, roles, categories,
            logout, setAuthenticated, setRoles
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;