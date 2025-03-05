import React, {ReactNode} from "react";


function Link({to, children, className}: {to: string, children?: ReactNode, className?: string}) {

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        window.history.pushState(null, '', to)
        window.dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
    }

    return (
        <a className={className} href={to} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Link;
