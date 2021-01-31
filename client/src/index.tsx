import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import Routes from './Routes';
import { getAccessToken } from './accessToken';

const getToken = () => {
  const token = getAccessToken();
  return token ? `bearer ${token}` : '';
};
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    authorization: getToken(),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);
