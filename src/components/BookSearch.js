import React, { Component } from 'react';
import Header from './Header'
import BookQueryForm from './BookQueryForm'
import BookList from './BookList'
import {search} from '../util/GoogleBooksApi'

const NO_IMAGE_DEFAULT= 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png'

class BookSearch extends Component {

  state = {
    results: [],
    query: '',
    isError: false,
    noResults: false
  }

  getImageURL = (imageInfo) => {
    if (imageInfo.imageLinks) {
      return imageInfo.imageLinks.smallThumbnail || NO_IMAGE_DEFAULT
    } else {
      return NO_IMAGE_DEFAULT
    }
  }

  updateQuery = (e) => {
    e.preventDefault()
    const query = e.target.value
    this.setState({
      query: query
    })
  }

  getBooks = async(e) => {
    e.preventDefault()
    search(this.state.query).then((data) => {
      if (data.totalItems > 0) { 
        const parsedResults = data.items.map(x => {
          const info = x.volumeInfo
          return {
            author: info.authors || '',
            title: info.title ||  '',
            publishingCompany: info.publisher || '',
            bookImageURL: this.getImageURL(info),
            description: info.description || '',
            infoLink: info.infoLink || ''
          }
        })
        this.setState({
          results: parsedResults,
        })
      } else if (data.totalItems === 0) {
        this.setState({
          noResults: true
        })
      } else {
        this.setState({
          isError: true
        })
      }
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