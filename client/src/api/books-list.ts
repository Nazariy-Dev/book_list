import configuration from "../configuration";
import {AddBookRequest, BookDetails, BookPage} from "./interfaces.ts";

const apiBasePath = `${configuration.apiUrl}`;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    let requestOptions = {
        method: "GET",
    };
        const response = await fetch(`${apiBasePath}${relativeUrl}`, requestOptions);
        const data = await response.json();
        return data;
}

async function post<T>(relativeUrl: string, data: T): Promise<Response> {

    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(`${apiBasePath}${relativeUrl}`, requestOptions);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response;

}

async function put(relativeUrl: string, data: AddBookRequest, id: string): Promise<Response> {
    let requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return await fetch(`${apiBasePath}${relativeUrl}/${id}`, requestOptions);
}

async function patch(relativeUrl: string, id: string, data: any): Promise<Response> {
    let requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return await fetch(`${apiBasePath}${relativeUrl}/${id}`, requestOptions);
}

async function remove(relativeUrl: string, id: string): Promise<Response> {
    let requestOptions = {
        method: 'DELETE',
    };
    return await fetch(`${apiBasePath}${relativeUrl}/${id}`, requestOptions);
}

interface IBooksListClient {
    getBooks: (filter?: string) => Promise<BookPage>;
    getBook: (id: string) => Promise<BookDetails>;
    addBook: (book: AddBookRequest) => Promise<Response>;
    editBook: (book: AddBookRequest, id: string) => Promise<Response>;
    removeBook: (id: string) => Promise<Response>;
    changeActivation: (id: string, data: { deactivated: boolean }) => Promise<Response>;
}

export const client: IBooksListClient = {
    getBooks: async (filter) => {
        let query = ""

        switch (filter) {
            case "active":
                query = "deactivated=false"
                break;
            case "deactivated":
                query = "deactivated=true"
        }
        const totalPages = await get<BookDetails[]>(`/books/`)
        const response = await get<BookDetails[]>(`/books/?${query}`)
        return {
            totalItems: totalPages.length,
            data: response,
        };
    },
    addBook: async (book) => {
        return await post<AddBookRequest>("/books", book);
    },
    editBook: async (book, id) => {
        return await put("/books", book, id);
    },
    removeBook: async (id) => {
        return await remove("/books", id);
    },
    changeActivation: async (id, data) => {
        return await patch("/books", id, data);
    },
    getBook: async (id: string) => {
        return await get<BookDetails>(`/books/${id}`);
    },
};
