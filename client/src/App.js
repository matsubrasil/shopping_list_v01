import React, { useEffect } from 'react';

import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Container } from 'reactstrap';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </Provider>
  );
};

export default App;
