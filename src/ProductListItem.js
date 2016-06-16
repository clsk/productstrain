import React from 'react';
import {render} from 'react-dom';


class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.selectedProductDidChange = props.selectedProductDidChange;
  }
  render() {
    return (
      <tr>
        <td> {this.props.product.id} </td>
        <td> {this.props.product.name } </td>
        <td> ${this.props.product.price } </td>
        <td> 
          <button className="btn btn-primary" onClick={this.selectedProductDidChange.bind(this, this.props.product.id, false)} data-toggle="modal" data-target="#editModal">View</button> <button className="btn btn-success" onClick={this.selectedProductDidChange.bind(this, this.props.product.id, true)} data-toggle="modal" data-target="#editModal">Edit</button> <button className="btn btn-danger">Delete</button></td> 
      </tr>
    )
  }
}

export default ProductListItem;