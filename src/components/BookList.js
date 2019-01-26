import React, {Component} from 'react'


class BookList extends Component {
  render() {
    return (
      <div className="book-list-container">
        {this.props.isError && (
          <h5 className="error-message">Error Fetching Results</h5>
        )}
        {this.props.noResults && (
          <h5 className="no-results-message">No Results</h5>
        )}
        {!this.props.isError && !this.props.noResults && (
          this.props.results.map(book => {
            return (
              <div className="col s12 m7 result-item" key={book.id}>
                <h5 className="header">{book.title}</h5>
                <div className="card horizontal">
                  <div className="card-image">
                    <img src={book.bookImageURL} alt="book cover"/>
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                      <p className="emphasisText">Author(s): {book.author}</p>
                      <p className="emphasisText">Publisher: {book.publishingCompany}</p>
                      <p>{book.description}</p>
                    </div>
                    <div className="card-action">
                      <a href={book.infoLink}>Learn More...</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    )
  }
}

export default BookList;