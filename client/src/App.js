import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import OrderHistory from './pages/OrderHistory';
import Signup from './pages/Signup';
import Success from './pages/Success';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            {/* Routes is not exported from react-router-dom
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/orderHistory' element={<OrderHistory />} />
              <Route path='/products/:id' element={<Detail />} />
              <Route element={NoMatch} />
            </Routes> */}

            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/success' component={Success} />
              <Route exact path='/orderHistory' component={OrderHistory} />
              <Route exact path='/products/:id' component={Detail} />
              <Route component={NoMatch} />
            </Switch>
            <Nav />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
