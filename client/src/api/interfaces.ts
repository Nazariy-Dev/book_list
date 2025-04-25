export interface ApiResponse<T> {
    data: T,
    error: string
}

export interface Book {
    title: string
    author: string
    category: string
    ISBN: string,
    id: string
}

export interface BookDetails extends Book {
    createdAt: string
    modifiedAt: string,
    deactivated: boolean,
}

export interface BookPage {
    totalItems: number,
    data: BookDetails[]
}

export interface AddBookRequest {
    title: string
    author: string
    category: string
    ISBN: number,
    createdAt: string
    modifiedAt: string,
    deactivated: boolean,
}

export interface EditBookRequest extends AddBookRequest {
    id: string
}
