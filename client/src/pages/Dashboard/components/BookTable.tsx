import {BookDetails} from "../../../api/interfaces.ts";
import {client} from "../../../api/books-list.ts";

import {useContext, useState} from "react";
import Alert from "../../../components/Alert.tsx";
import Modal from "../../../components/Modal.tsx";
import {AppContex} from "../Dashboard.tsx";
import BookItem from "./BookItem.tsx";

function BookTable({books, filter}: {
    books: BookDetails[], filter: string
}) {

    const {fetchBooks: refetchBooks, booksLoading, showingItems} = useContext(AppContex)
    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [bookTitle, setBookTitle] = useState("");
    const [bookId, setBookId] = useState("");

    const onDeleteBook = async (id: string) => {
        await client.removeBook(id)
        refetchBooks(filter)
        setShowModal(false)
        setSuccessMsgVisible(true)
        setTimeout(() => setSuccessMsgVisible(false), 3000)
    }


    const onChangeActivation = async (id: string, data: { deactivated: boolean }) => {
        await client.changeActivation(id, data)
        refetchBooks(filter)
    }

    return (
        <>
            {
                booksLoading ? <span
                        className="mt-4 relative left-1/2 -translate-x-1/2 flex justify-center loading loading-spinner loading-xl"></span> :
                    <div className="overflow-x-auto rounded-box border border-base-content/15 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr className="border-base-content/15">
                                    <th></th>
                                    <th>Book title</th>
                                    <th>Author name</th>
                                    <th>Category</th>
                                    <th>ISBN</th>
                                    <th> Created At</th>
                                    <th>Modified/Edited At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <BookItem
                                        onChangeActivation={onChangeActivation}
                                        setShowModal={setShowModal}
                                        setBookId={setBookId}
                                        setBookTitle={setBookTitle}
                                        book={book}
                                        key={index}
                                        index={index}/>
                                ))}
                            </tbody>
                        </table>
                        {successMsgVisible && <Alert message={`Book ${bookTitle} has been deleted`} type={"success"}/>}
                        {showModal &&
                            <Modal onCancel={() => setShowModal(false)} onConfirm={() => onDeleteBook(bookId)}/>}
                    </div>
            }
            {showingItems == 0 && !booksLoading &&
                <h1 className="text-2xl text-center my-4 font-semibold">No data</h1>}
        </>
    );
}

export default BookTable;
