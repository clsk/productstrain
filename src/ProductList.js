import React from 'react';
import {render} from 'react-dom';
import ProductListItem from './ProductListItem';

let products = [
  {
    id: 1,
    price: 12.00,
    name: 'Twix Chocolate Bar',
    description: 'This is a Twix chocolate bar',
    creationDate: Date.now()
  },
  {
    id: 2,
    price: 10.50,
    name: 'Snickers Chocolate bar',
    description: 'THis is a Snicker chocolate bar',
    creationDate: Date.now()
  },
  {
    id: 3,
    price: 9.40,
    name: 'Milky Way Chocolate bar',
    description: 'This is a Milky Way Chocolate bar',
    creationDate: Date.now()
  },
  {
    id: 4,
    price: 13.40,
    name: 'Kit Kat Chocolate bar',
    description: 'This is a Kit Kat Chocolate bar',
    creationDate: Date.now()
  }, 
  {
    id: 5,
    price: 9.40,
    name: 'Babe Ruth Chocolate bar',
    description: 'This is a Babe Ruth Chocolate bar',
    creationDate: Date.now()
  } 
];

class ProductList extends React.Component {
  constructor() {
    super();
   
    this.state = {
      products: products
    };
  }
  
  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            { this.state.products.map(product => { return (<ProductListItem product={product} key={product.id}/>) } ) }
          </tbody>
        </table>
      </div>
    )
  }
  
}

export default ProductList
