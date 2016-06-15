import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Link } from 'react-router';


class ProductListItem extends React.Component {
  deleteThisItem(e) {
  }
  
  render() {
    return (
      <tr>
        <td> {this.props.product.id} </td>
        <td> {this.props.product.name } </td>
        <td> {this.props.product.description } </td>
        <td> 
          <Link className="btn btn-primary" to={'/view/' + this.props.product.id}>View</Link> <Link className="btn btn-success" to={'/edit/' + this.props.product.id}>Edit</Link> <button className="btn btn-danger">Delete</button></td>
      </tr>
    )
  }
}

export default ProductListItem;