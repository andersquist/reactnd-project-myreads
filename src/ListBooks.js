import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from "./BookShelf";

class ListBooks extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array
  };

  render() {
    const { title, books } = this.props;
    const currentlyReading = books
      .filter( ({ shelf }) => shelf === 'currentlyReading');
    const wantToRead = books
      .filter( ({ shelf }) => shelf === 'wantToRead');
    const read = books
      .filter( ({ shelf }) => shelf === 'read');
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{ title }</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading" books={currentlyReading}/>
            <BookShelf title="Want to Read" books={wantToRead}/>
            <BookShelf title="Read" books={read}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
