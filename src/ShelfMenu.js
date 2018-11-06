import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Const from './constants';

class ShelfMenu extends Component {
  static propTypes = {
    selectedShelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  handleChange = (event) => {
    const { onShelfChange } = this.props;
    console.log(event.target.value);
    onShelfChange(event.target.value);
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
          <option value={Const.CURRENTLY_READING}>Currently Reading</option>
          <option value={Const.WANT_TO_READ}>Want to Read</option>
          <option value={Const.READ}>Read</option>
          <option value={Const.NONE}>None</option>
        </select>
      </div>
    )
  }
}

export default ShelfMenu;
