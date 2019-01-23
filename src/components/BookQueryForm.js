import React, {Component} from 'react'
import '../'
class BookQueryForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.getBooks}>
        <input className='input-field col 12' type='text' name='query' onChange={this.props.updateQuery} placeholder='Search...' />
        <button className="waves-effect waves-light btn-large" disabled={this.props.query === ""} type="submit" name="action"><i className="material-icons right">search</i>SEARCH</button>
      </form>
    )
  }
}

export default BookQueryForm;