import React from 'react';
import {render} from 'react-dom';
import ProductListItem from './ProductListItem';
import ProductShow from './ProductShow';

let productList = [
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
    
    let products = this.loadProductsFromStore();
    if (products == null || typeof(products) === 'undefined') {
      products = productList;
    }
    
    this.state = {
      products: products,
      selectedProduct: null,
      selectedProductEditable: true
    }
  }
  
  getProductById(productId) {
    for (const product of this.state.products) {
      if (product.id == productId) {
        return product;
      }
    }
    
    return null;
  }
  
  selectedProductDidChange(productId, editing) {
    if (productId != null) {
      let product = this.getProductById(productId);
      if (product != null) {
        this.setState({
          selectedProduct: product, 
          selectedProductEditable: editing
        });
      } else {
        console.log('Error: could not find product with id: ' + productId);
      }
    } else {
      // we're creating a new product
    }
  }
  
  editProduct(productToEdit) {
    var products = this.state.products.slice();
    for (let product of products) {
      if (product.id == productToEdit.id) {
        product = productToEdit;
        break;
      }
    }
    
    this.setState({
      products: products,
      selectedProduct: null,
      selectedProductEditable: true
    });
    
    this.saveProductsToStore(products);
  }

  generateProductId() {
    if (this.state.products.length >= 1000) {
      return null;
    }
    
    var gotUnique = false;
    while (!gotUnique) {
      var id = Math.floor((Math.random() * 1000) + 1);
      for (let product of this.state.products) {
        if (product.id == id) {
          break;
        }
      }
      
      gotUnique = true;
    }
    
    return id;
  }
  
  addProduct(product) {
    product.id = this.generateProductId();
    if (product.id != null) {
      let products = this.state.products.concat(product);
      this.setState({
        products: products,
        selectedProduct: null,
        selectedProductEditable: true
      });
      
      this.saveProductsToStore(products);
    } else {
      console.log('We\'ve reached the limit of 1000 items');
    }
    
  } 
  
  deleteProduct(productId) {
    let products = this.state.products.filter(product => {return product.id != productId});
    this.setState({
      products: products,
      selectedProduct: null,
      selectedProductEditable: true
    });
    
    this.saveProductsToStore(products);
  }
  
  saveProductsToStore(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  loadProductsFromStore() {
    return JSON.parse(localStorage.getItem('products'));
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.products.map(product => { 
                  return (
                    <ProductListItem 
                      product={product} 
                      selectedProductDidChange={this.selectedProductDidChange.bind(this)} 
                      deleteProduct={this.deleteProduct.bind(this)} key={product.id}
                    />
                  ) 
                }) 
              }
            </tbody>
          </table>
          <div>
            <ProductShow 
              product={this.state.selectedProduct} 
              editing={this.state.selectedProductEditable} 
              editProduct={this.editProduct.bind(this)}
              addProduct={this.addProduct.bind(this)}
              deleteProduct={this.deleteProduct.bind(this)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <button className="btn btn-default" onClick={this.selectedProductDidChange.bind(this, null, true)} data-toggle="modal" data-target="#editModal">Add New Product</button>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  }
}

export default ProductList
