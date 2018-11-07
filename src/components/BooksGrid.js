import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired
  };

  render() {
    const { books, onShelfChange } = this.props;
    return (
      <ol className="books-grid">
        {
          books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onShelfChange={onShelfChange}
            />
          ))
        }
      </ol>
    )
  }
}

export default BooksGrid;
