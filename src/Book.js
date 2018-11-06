import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfMenu from "./ShelfMenu";

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  };

  render() {
    const { book } = this.props;
    const authors = book.authors.join(', ');
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>

            </div>
            <ShelfMenu selectedShelf={book.shelf}/>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ authors }</div>
        </div>
      </li>
    )
  }
}

export default Book;
