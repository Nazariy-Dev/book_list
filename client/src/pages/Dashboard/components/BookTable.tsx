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
    const [deleteBookMsgVisible, setDeleteBookMsgVisible] = useState(false);
    const [deleteBookError, setDeleteBookError] = useState("");
    const [activationError, setActivationError] = useState("")

    const [showModal, setShowModal] = useState(false)
    const [bookTitle, setBookTitle] = useState("");
    const [bookId, setBookId] = useState("");

    const onDeleteBook = async (id: string) => {
        try {
            await client.removeBook(id)
            refetchBooks(filter)
            setShowModal(false)
            setDeleteBookMsgVisible(true)
            setTimeout(() => setDeleteBookMsgVisible(false), 3000)
        } catch (e) {
            setDeleteBookError(deleteBookError)
        }

    }

    const onChangeActivation = async (id: string, data: { deactivated: boolean }) => {
        try {
            await client.changeActivation(id, data)
            refetchBooks(filter)
        } catch (e: any) {
            setActivationError(e.message)
        }

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
                        {deleteBookMsgVisible && <Alert message={`Book ${bookTitle} has been deleted`} type={"success"}/>}
                        {deleteBookError && <Alert message={deleteBookError} type={"error"}/>}
                        {activationError && <Alert message={activationError} type={"error"}/>}
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
