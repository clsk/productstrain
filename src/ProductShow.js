import React from 'react';
import dateFormat from 'dateformat';

class ProductEdit extends React.Component {
  constructor(props) {
    super(props);
    
    if (props.product != null) {
      this.state = {
        id: props.product.id,
        name: props.product.name,
        price: props.product.price,
        creationDate: props.product.creationDate,
        description: props.product.description,
        editing: props.editing
      }
    } else {
       this.state = {
         id: null,
         name: '',
         price: '',
         creationDate: '',
         description: '',
         editing: true
      }     
    }
  }
  
  componentWillReceiveProps(props) {
    if (props.product != null) {
      this.state = {
        id: props.product.id,
        name: props.product.name,
        price: props.product.price,
        creationDate: props.product.creationDate,
        description: props.product.description,
        editing: props.editing
      }
    } else {
       this.state = {
         id: null,
         name: '',
         price: '',
         creationDate: '',
         description: '',
         editing: true
      }     
    }   
  }
  
  handleEditing(e) {
    if (this.state.editing) {
      var state = {};
      if (e.target.type == 'date') {
        // create a date object if this is a date
        state[e.target.name] = Date(e.target.value);
      }
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.id == null) { // creating new product
      console.log('creating new product');
      var product = {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        creationDate: Date.parse(this.state.creationDate)
      };
      
      this.props.addProduct(product);
      
    } else { // editing existing product
      console.log('editing product');
      this.props.product.name         = this.state.name;
      this.props.product.price        = this.state.price;
      this.props.product.description  = this.state.description;
      this.props.product.creationDate = Date.parse(this.state.creationDate);
      this.props.editProduct(this.props.product);
    }
    $('#editModal').modal('toggle');
  }
  
  render() {
    var idElement;
    if (this.state.id != null) {
      idElement = (
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input name="id" type="text" className="form-control" value={this.state.id} onChange={() => {}}/>
        </div>
      )
    }
    
    var submitButton;
    if (this.state.editing) {
      submitButton = (
        <button className="btn btn-success" type="submit">{this.state.id == null ? 'Create Product' : 'Edit Product'}</button>
      )
    }

    return (
      <div id="editModal" className="modal fade" role="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form role="form" onSubmit={this.handleSubmit.bind(this)}>
                { idElement }
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleEditing.bind(this)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input name="price" type="number" className="form-control" step="0.01" value={this.state.price} onChange={this.handleEditing.bind(this)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="creationDate">Date Created</label>
                  <input name="creationDate" type="date" className="form-control" value={dateFormat(this.state.creationDate, 'yyyy-mm-dd')} onChange={this.handleEditing.bind(this)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" rows="3" className="form-control" value={this.state.description} onChange={this.handleEditing.bind(this)}/>
                </div>               
                { submitButton }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductEdit;