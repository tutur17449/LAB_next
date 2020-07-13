export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
      
    const [auth, setAuth] = React.useState({
        isAuth: false,
        user: null
    });

    React.useEffect(() => {
        // logic here
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    );
}