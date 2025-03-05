import {useRef} from "react";

function Filters({setFilter}: { setFilter: (value: string) => void }) {
    const dropDownRef = useRef<HTMLDetailsElement | null>(null);

    const onFilterClick = (filter: string) => {
        setFilter(filter)
    }

    return (
        <details ref={dropDownRef} className="dropdown">
            <summary className="btn m-1">Show All</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                onClick={() => dropDownRef.current!.open = false}>
                <li onClick={() =>  onFilterClick("all")}><a>Show All</a></li>
                <li onClick={() => onFilterClick("active")}><a>Show Active</a></li>
                <li onClick={() => onFilterClick("deactivated")}><a>Show Deactivated</a></li>
            </ul>
        </details>
    );
}

export default Filters;
