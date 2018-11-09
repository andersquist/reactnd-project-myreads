import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from "./BookShelf";
import * as Const from '../constants';

const ListBooks = ({ title, books, onShelfChange }) => {
  const currentlyReading = books
    .filter( ({ shelf }) => shelf === Const.CURRENTLY_READING);
  const wantToRead = books
    .filter( ({ shelf }) => shelf === Const.WANT_TO_READ);
  const read = books
    .filter( ({ shelf }) => shelf === Const.READ);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{ title }</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={currentlyReading}
            onShelfChange={onShelfChange}
          />
          <BookShelf
            title="Want to Read"
            books={wantToRead}
            onShelfChange={onShelfChange}
          />
          <BookShelf
            title="Read"
            books={read}
            onShelfChange={onShelfChange}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>
          Add a book
        </Link>
      </div>
    </div>
  )
};

ListBooks.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired
};

export default ListBooks;
