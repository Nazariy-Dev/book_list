import Filters from "./Filters.tsx";
import Link from "../../../components/Link.tsx";

function Actions({setFilter, totalItems, showingCount} : {setFilter: (value: string)=>void, totalItems: number, showingCount: number}) {
    return (
        <div className="mb-4 flex gap-2 items-center">
            <Link to="/addBook">
                <div className="btn btn-md btn-primary">Add a book</div>
            </Link>
            <Filters setFilter={setFilter}/>
            <div className="font-semibold ml-2">
                {showingCount} / {totalItems}
            </div>
        </div>
    );
}

export default Actions;
