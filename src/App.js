import React from 'react'
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import * as Const from './constants';

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

  filterAndUpdateShelf = (books, ids, newShelf) => {
    return books
      .filter( ({ id }) => (ids.includes(id)))
      .map((book) => {
        const { shelf, ...rest } = book;
        return {
          ...rest,
          shelf: newShelf
        }
      });
  };

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((shelves) => {
        console.log('server response:', shelves);
        this.setState((currentState) => {
          const { books } = currentState;
          const currentlyReading = this.filterAndUpdateShelf(
            books, shelves.currentlyReading, Const.CURRENTLY_READING);
          const wantToRead = this.filterAndUpdateShelf(
            books, shelves.wantToRead, Const.WANT_TO_READ);
          const read = this.filterAndUpdateShelf(
            books, shelves.read, Const.READ);
          return {
            books: [...currentlyReading, ...wantToRead, ...read]
          }
        });
      });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() =>(
            <ListBooks
              title="MyReads"
              books={books}
              onShelfChange={this.handleShelfChange}/>
          )}/>
          <Route path='/search' component={SearchBooks}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
