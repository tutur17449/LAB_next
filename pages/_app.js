import 'bootstrap/scss/bootstrap.scss'
import Router from 'next/router'
import Loader from '../components/loader/index'

export default function MyApp({ Component, pageProps }) {

    const [isLoading, setIsLoading] = React.useState(false)

    Router.onRouteChangeStart = () => {
        setIsLoading(true)
      };
      
      Router.onRouteChangeComplete = () => {
        setIsLoading(false)
      };
      
      Router.onRouteChangeError = () => {
        setIsLoading(false)
      };

    return (
        isLoading ? (
            <Loader />
        ) : (
            <Component {...pageProps} />
        )
    )
}
