const { nanoid } = require('nanoid');
const books = require('./books');

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
            throw new Error ('Gagal menambahkan buku. Mohon isi nama buku');
        }

        // readPage > pageCount
        if(readPage > pageCount){
            throw new Error ('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
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
        const response = h.response({
            status: 'fail',
            message: error.message
        });
        response.code(400);
        return response;
    }
};

const getAllBooksHandler = (request, h) => {
    let data = [];
    books.forEach((book)=>{
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
  
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
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
            throw new Error ('Gagal memperbarui Buku. Id tidak ditemukan');
          }
        // nama null
        if(!name){
            throw new Error ('Gagal menambahkan buku. Mohon isi nama buku');
        }

        // readPage > pageCount
        if(readPage > pageCount){
            throw new Error ('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
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
        const response = h.response({
            status: 'fail',
            message: error.message
        });
        response.code(400);
        return response;
    }
};

const deletebookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);
  
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler};