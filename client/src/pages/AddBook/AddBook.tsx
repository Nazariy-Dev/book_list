import {client} from "../../api/books-list.ts";
import {AddBookRequest} from "../../api/interfaces.ts";
import {SyntheticEvent, useEffect, useState} from "react";
import {redirect} from "../../lib/functions.ts";
import Alert from "../../components/Alert.tsx";
import moment from "moment";
import {categories} from "../../lib/data.ts";
import ActionForm from "../../components/ActionForm.tsx";

function AddBook() {
    useEffect(() => {
        document.title = `Add book`;
    }, []);

    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [addBookError, setAddBookError] = useState("");

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!(e.target instanceof HTMLFormElement)) {
            throw new Error("Element is not form element");
        }
        const formData = new FormData(e.target);

        let data: AddBookRequest = {
            title: formData.get("title") as string,
            author: formData.get("author") as string,
            ISBN: Number(formData.get("ISBN")),
            category: formData.get("category") as string,
            createdAt: moment().utc().format(),
            modifiedAt: "",
            deactivated: false
        }

        try {
             await client.addBook(data);
            setSuccessMsgVisible(true);

        } catch (e: any) {
            setAddBookError(e.message);

        }

        setTimeout(() => {
            redirect("/")
        }, 3000);
    }

    return (
        <ActionForm title={"Add Book"}>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4'>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Book title</legend>
                        <input type="text" className="input w-full validator" name="title" placeholder="Title"
                               required/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Author</legend>
                        <input type="text" className="input w-full validator" name="author" placeholder="Type here"
                               required/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">ISBN</legend>
                        <input type="number" min={1} className="input w-full validator" name="ISBN"
                               placeholder="Type here" required/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Category</legend>
                        <select className="select textmb w-full placeholder:text-slate-300 validator" name="category"
                                required>
                            <option selected disabled hidden value="">Choose category</option>

                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </fieldset>

                    <button className={"btn btn-primary btn-md mt-2"} type="submit">Add a Book</button>
                    {successMsgVisible && <Alert message={"Book has been added"} type={"success"}/>}
                    {addBookError && <Alert message={addBookError} type={"error"}/>}
                </div>
            </form>
        </ActionForm>

    );
}

export default AddBook;
