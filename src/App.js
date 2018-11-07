import React from 'react'
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books });
      });
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((shelves) => {
        this.setState((currentState) => {
          book.shelf = shelf;
          return {
            books: [...currentState.books.filter( b => b.id !== book.id) ,
              book]
          }
        });
      });
  };

  getShelvesBookIds = (books) => (
      books.map((book) => ({
        id: book.id,
        shelf: book.shelf
      }))
  );

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() =>(<ListBooks
              title="MyReads"
              books={books}
              onShelfChange={this.handleShelfChange}/>)
          }/>
          <Route path='/search' render={() => (
            <SearchBooks
              onShelfChange={this.handleShelfChange}
              shelves={this.getShelvesBookIds(books)}
            />
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
