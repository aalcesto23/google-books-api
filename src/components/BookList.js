import React, {Component} from 'react'

class BookList extends Component {
  render() {
    return (
      <div>
        {
          this.props.results.map(book => {
            return (
              <div class="col s12 m7">
                <h5 class="header">{book.title}</h5>
                <div class="card horizontal">
                  <div class="card-image">
                    <img src={book.bookImageURL} />
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <p>Author(s): {book.author}</p>
                      <p>Publisher: {book.publishingCompany}</p>
                      <p>{book.description}</p>
                    </div>
                    <div class="card-action">
                      <a href={book.infoLink}>Learn More...</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default BookList;