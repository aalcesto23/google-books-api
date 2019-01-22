import React, {Component} from 'react'
import '../'
class BookQueryForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.getBooks}>
        <input class='input-field col 12' type='text' name='query' placeholder='Search...' />
        <button class="waves-effect waves-light btn-large" type="submit" name="action"><i class="material-icons right">search</i>SEARCH</button>
      </form>
    )
  }
}

export default BookQueryForm;