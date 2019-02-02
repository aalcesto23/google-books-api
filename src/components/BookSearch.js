import React, { Component } from 'react';
import Header from './Header'
import BookQueryForm from './BookQueryForm'
import BookList from './BookList'
import {search} from '../util/GoogleBooksApi'
import {parseReponse} from '../util/ConfigureBookInfo'

class BookSearch extends Component {

  state = {
    results: [],
    query: '',
    isError: false,
    noResults: false
  }

  updateQuery = (e) => {
    e.preventDefault()
    const query = e.target.value
    this.setState({
      query: query
    })
  }

  uppdateResponse = (data) => {
    const response = parseReponse(data)
    this.setState({
      results: response.results,
      noResults: response.noResults,
      isError: response.isError
    })
  }

  getBooks = async(e) => {
    e.preventDefault()
    search(this.state.query).then((data) => {
      this.uppdateResponse(data)
    })
  }
  
  render() {
    return (
      <div className="app-container">
        <Header />
        <BookQueryForm 
          getBooks={this.getBooks} 
          query={this.state.query} 
          updateQuery={this.updateQuery}
        />
        <BookList 
          results={this.state.results} 
          isError={this.state.isError} 
          noResults={this.state.noResults}
        />
      </div>
    );
  }
}

export default BookSearch;