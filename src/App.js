import React, { Component } from 'react';
import Header from './components/Header'
import BookQueryForm from './components/BookQueryForm'
import BookList from './components/BookList'

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
const API_HOST = 'https://www.googleapis.com/books/v1/volumes'
const MAX_RESULTS = '40'
const NO_IMAGE_DEFAULT= 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png'

class App extends Component {

  state = {
    results: []
  }

  getImageURL = (info) => {
    if (info.imageLinks) {
      return info.imageLinks.smallThumbnail || NO_IMAGE_DEFAULT
    } else {
      return NO_IMAGE_DEFAULT
    }
  }

  getBooks = async(e) => {
    e.preventDefault()
    const query = e.target.elements.query.value
    const api_call = await fetch(`${API_HOST}?q=${query}&maxResults=${MAX_RESULTS}&key=${API_KEY}`)
    const data = await api_call.json();
    console.log(data)
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
      results: parsedResults
    })
    console.log('after set', this.state)
  }
  
  render() {
    return (
      <div className="app-container">
        <Header />
        <BookQueryForm getBooks={this.getBooks} />
        <BookList results={this.state.results} />
      </div>
    );
  }
}

export default App;
