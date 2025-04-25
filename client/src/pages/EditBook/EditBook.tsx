import {client} from "../../api/books-list.ts";
import {AddBookRequest, BookDetails} from "../../api/interfaces.ts";
import {SyntheticEvent, useEffect, useState} from "react";
import {redirect} from "../../lib/functions.ts";
import Alert from "../../components/Alert.tsx";
import moment from "moment";
import {categories} from "../../lib/data.ts";
import ActionForm from "../../components/ActionForm.tsx";

function EditBook() {
    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [book, setBook] = useState<BookDetails | null>(null);

    useEffect(() => {
        fetchBook()
        document.title = `Edit book`;
    }, []);

    const fetchBook = async () => {
        const params = new URL(window.location.href).searchParams;
        const id = params.get("id")
        const data = await client.getBook(id!);
        setBook(data)
    }


    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!(e.target instanceof HTMLFormElement)) {
            throw new Error("Element is not form element");
        }
        const formData = new FormData(e.target);

        let editedBook: AddBookRequest = {
            title: formData.get("title") as string,
            author: formData.get("author") as string,
            ISBN: Number(formData.get("ISBN")),
            category: formData.get("category") as string,
            createdAt: book!.createdAt,
            modifiedAt: moment().utc().format(),
            deactivated: book!.deactivated
        }

        const response = await client.editBook(editedBook, book!.id);

        if (response.ok) {
            setSuccessMsgVisible(true);
        } else {
            setErrorMessageVisible(true);
        }

        const timerId= setTimeout(() => {
            redirect("/")
        }, 3000);

        return ()=> {
            clearTimeout(timerId)
        }
    }


    return (
        <ActionForm title={`Editing ${book?.title}`}>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Book title</legend>
                        <input defaultValue={book?.title} type="text" className="input w-full validator"
                               name="title"
                               placeholder="Title" required/>

                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Author</legend>
                        <input defaultValue={book?.author} type="text" className="input w-full validator"
                               name="author"
                               placeholder="Type here" required/>

                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">ISBN</legend>
                        <input defaultValue={book?.ISBN} type="text" className="input w-full validator" name="ISBN"
                               placeholder="Type here" required/>

                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Category</legend>
                        <select
                            className="select textmb w-full placeholder:text-slate-300 validator" name="category"
                            required>

                            {categories.map(category => (
                                <option selected={category == book?.category} key={category}
                                        value={category}>{category}</option>
                            ))}
                        </select>

                    </fieldset>

                    <button className={"btn btn-primary btn-md mt-2"} type="submit">Done</button>
                    {successMsgVisible && <Alert message={"Book has been added"} type={"success"}/>}
                    {errorMessageVisible && <Alert message={"Something went wrong"} type={"error"}/>}
                </div>
            </form>
        </ActionForm>

    );
}

export default EditBook;
