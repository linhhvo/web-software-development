import * as bookRepo from "./bookRepository.js";
import { zValidator } from "zValidator";
import { bookValidator } from "../validators.js";


const getBooks = async (c) => {
    const books = await bookRepo.readAll()
    return c.json(books)
}

const createBook = [zValidator("json", bookValidator), async (c) => {
    const book = await c.req.json()
    const newBook = await bookRepo.create(book)
    return c.json(newBook)
}]

const getBook = async (c) => {
    const book = await bookRepo.readOne(c.req.param('bookId'))
    return c.json(book)
}

const updateBook = [zValidator('json', bookValidator), async (c) => {
    const newBook = await c.req.json()
    const updatedBook = await bookRepo.update(c.req.param('bookId'), newBook)
    return c.json(updatedBook)
}]

const deleteBook = async (c) => {
    const deletedBook = await bookRepo.remove(c.req.param('bookId'))
    return c.json(deletedBook)
}

export {getBooks, createBook, getBook, updateBook, deleteBook}