import Link from "../../../components/Link.tsx";
import {BookDetails} from "../../../api/interfaces.ts";
import {toCurrentTimeZone} from "../../../lib/functions.ts";

function BookItem({book, index, onChangeActivation, setShowModal, setBookId, setBookTitle}: {
    book: BookDetails,
    index: number,
    onChangeActivation: (id: string, data: { deactivated: boolean }) => void
    setShowModal: (value: boolean) => void
    setBookId: (value: string) => void,
    setBookTitle: (value: string) => void
}) {

    const onDeleteIntent = () => {
        setBookId(book.id)
        setShowModal(true);
        setBookTitle(book.title);
    }

    console.log("render")
    return (
        <tr key={book.id} className="border-base-content/15">
            <th className={book.deactivated ? "opacity-30" : ""}>{index + 1}</th>
            <td className={book.deactivated ? "opacity-30" : ""}>{book.title}</td>
            <td className={book.deactivated ? "opacity-30" : ""}>{book.author}</td>
            <td className={book.deactivated ? "opacity-30" : ""}>{book.category}</td>
            <td className={book.deactivated ? "opacity-30" : ""}>{book.ISBN}</td>
            <td className={book.deactivated ? "opacity-30" : ""}>{toCurrentTimeZone(book.createdAt)}</td>
            <td className={book.deactivated ? "opacity-30" : ""}>{book.modifiedAt ? toCurrentTimeZone(book.modifiedAt) : "-"}</td>
            <td className="flex gap-2 flex-wrap opacity-100">
                <Link className="btn btn-accent btn-xs" to={"/editBook?id=" + book.id}>
                    Edit
                </Link>
                {book.deactivated && <div onClick={onDeleteIntent} className="btn btn-accent btn-xs">
                    Delete
                </div>}
                <div className="btn btn-accent btn-xs"
                     onClick={() => onChangeActivation(book.id, {deactivated: !book.deactivated})}>
                    {book.deactivated ? "Re-Activate" : "Deactivate"}
                </div>
            </td>


        </tr>
    );
}

export default BookItem;
