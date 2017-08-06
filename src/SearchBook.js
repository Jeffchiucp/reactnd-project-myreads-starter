import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
// Handling the queries and sorting by
import sortBy from 'sort-by'

class SearchBook extends Component {

  state  = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    // (query !== this.state.query) && (this.setState({ query: query.trim()}),console.log(query))
    if (query !== this.state.query) {
      // 0. Checking it is calling the function from the search field
      //console.log(this.props.books)
      // 1. we update the value of query in the state
      this.setState({ query: query})
      // 2. we repopulate the searchedBooks
      BooksAPI.search(this.state.query, 20).then((searchedBooks) => {
        // set a conditional to handle undefined and null
        if (searchedBooks !== null && searchedBooks !== undefined) {
          // Let's create a function that for each element of the HP books
          // Checks if said element id is present in the books returned by the API
          // And in affirmative case, changes the self values in the search array
          // to be synchronized with the hp view
          function  syncBook(book){
            newArray: searchedBooks.map((b) => { return b.id === book.id ? (b.shelf = book.shelf, b) : b})
          }
          this.props.books.forEach(syncBook)
          searchedBooks.sort(sortBy('title'))
          this.setState({ searchedBooks })
          }
        })
    }
  }


  render (){
    return (
      <div className="list-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className=""
              type="text"
              placeholder="search books"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-book-search">
          <Bookshelf books={this.state.searchedBooks} onShelfChange={this.props.onShelfChange}/>
        </div>
      </div>
    )
  }
}

export default SearchBook
