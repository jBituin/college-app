import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './accessToken';
import Routes from './Routes';

const getToken = () => {
  const token = getAccessToken();
  console.log('token@getTokenAuth :', token);
  return token ? `bearer ${token}` : '';
};

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const headerLink = setContext((_, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: getToken(),
  },
}));

const client = new ApolloClient({
  link: headerLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
