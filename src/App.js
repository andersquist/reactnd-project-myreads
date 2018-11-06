import React from 'react'
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";


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

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() =>(
            <ListBooks title="MyReads" books={books}/>
          )}/>
          <Route path='/search' component={SearchBooks}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
