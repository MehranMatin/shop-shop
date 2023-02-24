import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
} from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_CATEGORIES } from '../../utils/queries';

function CategoryMenu() {
  // retrieve the current state from the global state object and the dispatch() method to update state
  const [state, dispatch] = useStoreContext();
  // because we only need the categories array out of our global state, we simply destructure it out of state so we can use it to provide to our returning JSX
  const { categories } = state;
  // destructure the categoryData that returns from the useQuery() Hook
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  // categoryData is going to be undefined on load because the useQuery() Hook isn't done with its request just yet, meaning that when useEffect hook initially runs the if statement will not
  // when it notices that categoryData is not undefined anymore the hook runs again, thus running the if statement which includes the dispatch() function that setting our category data to the global state
  useEffect(
    // first argument in hook is the function to run given a certain condition
    () => {
      // if categoryData exists or has changed from the response of useQuery, then run dispatch()
      if (categoryData) {
        dispatch({
          // action object indicating the type of action
          type: UPDATE_CATEGORIES,
          // and the data to set our for categories to
          categories: categoryData.categories
        });
      }
    },
    // second argument in hook is the condition
    [categoryData, dispatch]
  );

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
