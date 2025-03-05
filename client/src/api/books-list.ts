import configuration from "../configuration";
import {AddBookRequest, BookDetails, BookPage} from "./interfaces.ts";

const apiBasePath = `${configuration.apiUrl}`;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    let requestOptions = {
        method: "GET",
    };
    const response = await fetch(`${apiBasePath}${relativeUrl}`, requestOptions);
    const value: TBody = await response.json();
    return value;
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
    const response = await fetch(`${apiBasePath}${relativeUrl}/${id}`, requestOptions);
    return response;
}

async function patch(relativeUrl: string, id: string, data: any): Promise<Response> {
    let requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch(`${apiBasePath}${relativeUrl}/${id}`, requestOptions);
    return response;
}

async function remove(relativeUrl: string, id: string): Promise<Response> {
    let requestOptions = {
        method: 'DELETE',
    };
    const response = await fetch(`${apiBasePath}${relativeUrl}/${id}`, requestOptions);
    return response;
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
        const response = await post<AddBookRequest>("/books", book)
        return response;
    },
    editBook: async (book, id) => {
        const response = await put("/books", book, id)
        return response;
    },
    removeBook: async (id) => {
        const response = await remove("/books", id)
        return response;
    },
    changeActivation: async (id, data) => {
        const response = await patch("/books", id, data)
        return response;
    },
    getBook: async (id: string) => {
        const response = await get<BookDetails>(`/books/${id}`)
        return response;
    },
};
