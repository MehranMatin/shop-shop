import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

// instantiate the global state object
const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  // state is the most up-to-date version of our global state object
  // dispatch is the method we execute to update our state
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: ''
  });
  // use this to confirm it works!
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// grab the state from the <StoreProvider> component
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
