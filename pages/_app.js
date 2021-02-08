import ApolloClient from 'apollo-boost';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Router from 'next/router';
import fetch from 'node-fetch';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import { API_GRAPHQL } from '../config.js';
import { initStore } from '../redux';

import '@styles/global.scss';

const client = new ApolloClient({
  uri: API_GRAPHQL,
  fetch: fetch,
});

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}),
        },
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      );
    }
  }
);
