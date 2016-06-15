import React from 'react';

class ProductEdit extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" classname="form-control" value={products[0].id}/>
          </div>
        </form>
      </div>
    )
  }
}

export default ProductEdit;