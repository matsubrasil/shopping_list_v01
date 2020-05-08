import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
const App = () => {
  return (
    <>
      <Header />
      <ShoppingList />
    </>
  );
};

export default App;
