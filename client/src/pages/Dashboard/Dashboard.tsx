import Actions from "./components/Actions.tsx";
import BookTable from "./components/BookTable.tsx";
import {BookDetails} from "../../api/interfaces.ts";
import {client} from "../../api/books-list.ts";
import React, {useEffect, useState} from "react";
import Alert from "../../components/Alert.tsx";


interface IState {
    showingItems: number;
    booksLoading: boolean;
    fetchBooks: (filter: string) => void;
}

const defaltState = {
    booksLoading: false,
    fetchBooks: () => {
    },
    showingItems: 0
}


export const AppContex = React.createContext<IState>(defaltState)


function Dashboard() {

    const [books, setBooks] = useState<BookDetails[]>([])
    const [filter, setFilter] = useState<string>("")
    const [totalItems, setTotalItems] = useState<number>(0)
    const [booksLoading, setBooksLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")


    useEffect(() => {
        fetchBooks()
        document.title = `Dashboard`;
    }, []);

    useEffect(() => {
        if (!filter) return
        fetchBooks(filter)
    }, [filter]);

    const fetchBooks = async (filter?: string) => {
        try {
            setBooksLoading(true)
            const {data, totalItems} = await client.getBooks(filter);

            setBooks(data);
            setTotalItems(totalItems)
            setBooksLoading(false)
        } catch (e: any) {
            setBooksLoading(false)
            setError(e.message)
        }
    }


    return (
        <AppContex.Provider value={{fetchBooks, showingItems: books.length, booksLoading}}>
            <h1 className="text-4xl text-bold mb-6">Welcome to Books List</h1>
            {!error ?
                <>
                    <Actions setFilter={setFilter} totalItems={totalItems} showingCount={books.length}/>
                    <BookTable filter={filter} books={books}/>
                </>
                : <Alert message={"Something went wrong"} type={"error"}/>
            }

        </AppContex.Provider>
    );
}

export default Dashboard;
