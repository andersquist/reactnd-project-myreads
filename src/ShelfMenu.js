import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ShelfMenu extends Component {
  static propTypes = {
    selectedShelf: PropTypes.string.isRequired
  };

  handleChange = (event) => {
    console.log(event.target.value);
  };

  render() {
    const { selectedShelf } = this.props;
    return (
      <div className="book-shelf-changer">
        <select
          value={selectedShelf}
          onChange={this.handleChange}
        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfMenu;
