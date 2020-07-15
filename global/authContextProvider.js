import Cookies from 'js-cookie'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = React.useState({
        isAuth: false,
        user: null
    });

    React.useEffect(() => {
        if (typeof Cookies.get("auth_cookie") !== 'undefined' && !auth.isAuth) {
            fetch('http://localhost:3333/me')
            .then(response => {
                return response.json()
            })
            .then(jsonData => {
                if(jsonData.ok){
                    setAuth({
                        isAuth: true,
                        user: jsonData.data
                    })
                }
            })
            .catch(error => {
                setAuth({
                    isAuth: false,
                    user: null
                })
            })
        } else {
            console.log('no context')
        }
    }, [])

    const login = async () => {
        const params = {
            method: 'POST',
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              email: "test",
              password: "fake@email.fr",
            })
        }
        fetch('http://localhost:3333/login', params)
        .then(response => {
            return response.json()
        })
        .then(jsonData => {
            console.log(jsonData)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, login }} >
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = React.useContext(AuthContext)
    return context
};
