const { nanoid } = require('nanoid');
const books = require('./books');
const { ApiError, handleApiError} = require('./exceptions');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    try{
        // nama null
        if(!name){
            throw new ApiError ('Gagal menambahkan buku. Mohon isi nama buku', 400);
        }

        // readPage > pageCount
        if(readPage > pageCount){
            throw new ApiError ('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
        }

        //jika valid maka sukses
        const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        books.push(newBook);

        response.code(201);
        return response;
        

    } catch (error){
        return handleApiError(h, error);
    }
};

const getAllBooksHandler = (request, h) => {
    let data = [];
    rawBooks = books;

    // filter by query (parameter di url)
    // jika reading = 1
    if(request.query.reading){
        rawBooks = books.filter((book)=>{
            return book.reading === !!parseInt(request.query.reading)
        })
    }

    // jika finished = 1
    if(request.query.finished){
        rawBooks = books.filter((book)=>{
            return book.finished === !!parseInt(request.query.finished)
        })
    }

    // jika name = Dicoding
    if(request.query.name){
        rawBooks = books.filter((book)=>{

            return book.name.toLowerCase().includes(request.query.name.toLowerCase());
        })
    }

    rawBooks.forEach((book)=>{
        data.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        })
    })

    const response = h.response({
        status: 'success',
        data: { 
            books: data 
        }
    });
    response.code(200);
    return response;
};

const getbookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    try{
        if(book === undefined){
            throw new ApiError ('Buku tidak ditemukan', 404);
        }

        return {
            status: 'success',
            data: {
              book,
            },
          };

    } catch(error){
        return handleApiError(h, error);
    }

};

const editbookByIdHandler = (request, h) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = (pageCount === readPage);

    const index = books.findIndex((book) => book.id === id);

    try{
        // tidak ada id
        if (index === -1) {
            throw new ApiError ('Gagal memperbarui buku. Id tidak ditemukan', 404);

          }
        // nama null
        if(!name){
            throw new ApiError ('Gagal memperbarui buku. Mohon isi nama buku', 400);
        }

        // readPage > pageCount
        if(readPage > pageCount){
            throw new ApiError ('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);
        }

        //jika valid maka sukses
        books[index] = {
            ...books[index],
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading,
            updatedAt,
            finished,
          };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });

        response.code(200);
        return response;
        

    } catch (error){
        return handleApiError(h, error);
    }
};

const deletebookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);
    try{
        if(index === -1){
            throw new ApiError ('Buku gagal dihapus. Id tidak ditemukan', 404);
        }

        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;

    } catch(error){
        return handleApiError(h, error);
    }

};

module.exports = { addBookHandler, getAllBooksHandler, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler};