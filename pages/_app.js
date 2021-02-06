import App, { Container } from 'next/app';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import fetch from 'node-fetch';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import { API_GRAPHQL } from '../config';

import '../styles/global.scss';


const client = new ApolloClient({
  uri: API_GRAPHQL,
  fetch: fetch
});

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <ApolloProvider client={client}>
            <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </Container>
      );
    }
  }
);
