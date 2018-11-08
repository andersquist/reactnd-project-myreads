import React from 'react';
import PropTypes from 'prop-types';
import ShelfMenu from "./ShelfMenu";

const Book = ({ book, onShelfChange }) => {
  const { authors, imageLinks, shelf, title } = book;
  const placeholder = 'https://via.placeholder.com/128x193?text=No%20Cover';
  const authorsDisplay = authors ? authors.join(', ') : '';
  const thumbnail = imageLinks && imageLinks.thumbnail ?
    imageLinks.thumbnail : placeholder;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${thumbnail}")` }}>

          </div>
          <ShelfMenu
            selectedShelf={shelf ? shelf : 'none'}
            onShelfChange={(shelf) => onShelfChange(book, shelf)}
          />
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authorsDisplay }</div>
      </div>
    </li>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Book;
