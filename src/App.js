import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';
import ProductView from './ProductView';


class App extends React.Component {
  render() {
    return (
      <ProductList />
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={ ProductList }/>
    <Route path="edit/:id" component={ProductEdit}/>
    <Route path="view/:id" component={ProductView}/>
  </Router>
), document.getElementById('app'));
