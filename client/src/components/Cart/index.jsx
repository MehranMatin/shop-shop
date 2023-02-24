import React, { useEffect } from 'react';
import { ADD_MULTIPLE_TO_CART, TOGGLE_CART } from '../../utils/actions';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import './style.css';

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  if (!state.cartOpen) {
    return (
      <div className='cart-closed' onClick={toggleCart}>
        <span role='img' aria-label='cart'>
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className='close' onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className='flex-row space-between'>
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role='img' aria-label='shocked'>
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}

      {/* <div>
        <CartItem
          item={{
            name: 'Camera',
            image: 'camera.jpg',
            price: 5,
            purchaseQuantity: 3
          }}
        />
        <CartItem
          item={{
            name: 'Soap',
            image: 'soap.jpg',
            price: 6,
            purchaseQuantity: 4
          }}
        />

        <div className='flex-row space-between'>
          <strong>Total: $0</strong>
          {Auth.loggedIn() ? (
            <button>Checkout</button>
          ) : (
            <span>(log in to check out)</span>
          )}
        </div> */}
    </div>
  );
};

export default Cart;
