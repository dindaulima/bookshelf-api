const { addBookHandler, getAllBooksHandler, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler} = require('./handler')


const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getbookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editbookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deletebookByIdHandler,
  },
];

module.exports = routes;