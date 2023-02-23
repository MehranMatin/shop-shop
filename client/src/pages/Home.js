import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className='container'>
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;
