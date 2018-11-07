import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BooksGrid from './BooksGrid';
import PropTypes from "prop-types";

class SearchBooks extends Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  };

  state = {
    books: [],
    query: ''
  };

  updateQuery = (query) => {
    const trimmedQuery = query.trim();
    this.setState((currentState) => {
      return trimmedQuery !== '' ? {
        query: trimmedQuery
        } : {
        query: '',
        books: []
      }
    });
    //TODO: add debounce
    if (trimmedQuery !== '') {
      this.queryBooks(trimmedQuery);
    }
  };

  queryBooks = (query) => {
    const { shelves } = this.props;
    BooksAPI.search(query)
      .then((books) => {

        // Handle 403s and other errors
        if (books !== undefined && Array.isArray(books)) {

          books.forEach((book) => {
            const bookShelf = shelves.find((b) => (b.id === book.id));
            book.shelf = bookShelf !== undefined ? bookShelf.shelf : 'none';
          });

          this.setState({
            books: books
          });
        }
      });
  };

  handleShelfChange = (book, shelf) => {
    const { onShelfChange } = this.props;
    this.setState((currentState) => {
      currentState.books.forEach((b) => {
        if (b.id === book.id) {
          book.shelf = shelf;
        }
      });
      return {
        books: currentState.books
      }
    });

    onShelfChange(book, shelf);
  };

  render() {
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={books}
            onShelfChange={this.handleShelfChange}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
