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

  secureImageURL = (url) => {
    if (!url) {
      return
    }
    const imageURL = new URL(url)
    imageURL.protocol = 'https'
    return imageURL.toString()
  }

  getImageURL = (imageInfo) => {
    if (imageInfo.imageLinks) {
      return this.secureImageURL(imageInfo.imageLinks.smallThumbnail) || NO_IMAGE_DEFAULT
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

  handleMultipleAuthors = (authors) => {
    return authors ? authors.join(', ') : ''
  }

  parseResponse = (data) => {
    if (data.totalItems > 0) { 
      const parsedResults = data.items.map(x => {
        const info = x.volumeInfo
        return {
          author: this.handleMultipleAuthors(info.authors),
          title: info.title ||  '',
          publishingCompany: info.publisher || '',
          bookImageURL: this.getImageURL(info),
          description: info.description || '',
          infoLink: info.infoLink || '',
          id: x.id
        }
      })
      this.setState({
        results: parsedResults,
        noResults: false,
        isError: false
      })
    } else if (data.totalItems === 0) {
      this.setState({
        results: [],
        noResults: true,
        isError: false
      })
    } else {
      this.setState({
        results: [],
        noResults: false,
        isError: true
      })
    }
  }

  getBooks = async(e) => {
    e.preventDefault()
    search(this.state.query).then((data) => {
      this.parseResponse(data)
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