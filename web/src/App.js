import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
require('dotenv').config()

import GlobalStyle from './components/GlobalStyle';

import Pages from './pages';

const uri = process.env.API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
