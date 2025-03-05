import {useRouteChange} from "../lib/hooks/useRouteChange.ts";
import React from "react";


interface Route {
    path: string;
    component: React.FC
}

function Outlet({routes}: { routes: Route[] }) {
    const currentRoute = useRouteChange()
    const route = routes.find((route) => route.path === currentRoute)

    if (!route) {
        return <h1 className={"text-center text-4xl text-bold mt-20"}>There is no component within this route</h1>
    }

    const OutletComponent = route.component


    return (
        <>
            <OutletComponent/>
        </>
    )
}

export default Outlet
