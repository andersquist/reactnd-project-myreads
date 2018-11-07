import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfMenu from "./ShelfMenu";

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  handleShelfChange = (shelf) => {
    const { book, onShelfChange } = this.props;
    onShelfChange(book, shelf);
  };

  render() {
    const { book } = this.props;
    const authors = book.authors ? book.authors.join(', ') : '';
    const thumbnail = book.imageLinks && book.imageLinks.thumbnail ?
      book.imageLinks.thumbnail : '';
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
              selectedShelf={book.shelf ? book.shelf : 'none'}
              onShelfChange={this.handleShelfChange}
            />
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ authors }</div>
        </div>
      </li>
    )
  }
}

export default Book;
