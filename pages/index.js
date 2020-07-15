import useAuth from '../global/authContextProvider'

export default function Home(){

    const {auth, login} = useAuth()

    return(
        <React.Fragment>
            <h1>Home</h1>
            <button onClick={login}>LOGIN</button>
        </React.Fragment>
    )
}