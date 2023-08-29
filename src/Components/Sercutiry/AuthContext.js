import { createContext, useContext, useState } from "react";

// create context
export let AuthContext = createContext();
// get context to use
export let useAuth = () => useContext(AuthContext);
// data
const categoriesData = [
    {
        id: 1,
        title: 'Arts & Photography',
        isOpen: false,
        subcategories: [
            { id: 2, name: 'Fashion', parentId: 1 },
            { id: 3, name: 'Graphic Design', parentId: 1 },
        ]
    },
    {
        id: 4,
        title: 'Business & Money',
        isOpen: false,
        subcategories: [
            { id: 5, name: 'Economics', parentId: 4 },
            { id: 6, name: 'Investing', parentId: 4 },
        ]
    },
    {
        id: 7,
        title: 'Humor & Entertainment',
        isOpen: false,
        subcategories: [
            { id: 8, name: 'Humor', parentId: 7 },
            { id: 9, name: 'Puzzles & Games', parentId: 7 },
        ]
    },
];

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
            isAuthenticated, roles, categoriesData,
            logout, setAuthenticated, setRoles
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;