import React from 'react';
import {render} from 'react-dom';
import ProductList from './ProductList';



class App extends React.Component {
  // constructor() {
  //   super();
  //  
  //   this.state = {
  //     products: []
  //   };
  // }
  render() {
    return (
      <ProductList  />
    )
  }
}

render((<App />), document.getElementById('app'));
