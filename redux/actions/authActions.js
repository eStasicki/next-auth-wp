import axios from 'axios';
import Router from 'next/router';

import { API } from '../../config';

import { setCookie, removeCookie } from '@utils/cookie';

import { AUTHENTICATE, DEAUTHENTICATE } from '@redux/types';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ username, password }, type) => {
  return (dispatch) => {
    axios
      .post(`${API}/wp-json/jwt-auth/v1/token`, { username, password })
      .then((response) => {
        setCookie('token', response.data.token);
        Router.push('/');
        dispatch({ type: AUTHENTICATE, payload: response.data.token });
      })
      .catch((error, response) => {
        removeCookie('token');
        Router.push('/');
        dispatch({ type: DEAUTHENTICATE });
      });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({ type: DEAUTHENTICATE });
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
