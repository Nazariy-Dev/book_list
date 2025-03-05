import {useEffect, useState} from "react";


export const useRouteChange = () => {
    const [currentRoute, setCurrentRoute] = useState('/')

    useEffect(() => {
        setCurrentRoute(window.location.pathname)
        window.addEventListener("popstate", handleChangeURl)

        return () => {
            window.removeEventListener("popstate", handleChangeURl)
        }
    }, []);

    const handleChangeURl = () => {
        setCurrentRoute(window.location.pathname)
    }

    return currentRoute

}
