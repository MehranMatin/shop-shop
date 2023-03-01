import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { idbPromise } from '../utils/helpers';
import { ADD_ORDER } from '../utils/mutations';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      // get all of the cart items
      const cart = await idbPromise('cart', 'get');
      // maps the cart items into an array of product IDs
      const products = cart.map((item) => item._id);

      // Once you have the product IDs, you can pass them to the addOrder() mutation. After the mutation executes, you can then delete all of the IDs from the IndexedDB store
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        alert('');
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
