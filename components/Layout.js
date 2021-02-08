import Link from 'next/link';
import { connect } from 'react-redux';

import Login from '@components/Login';
import Sidebar from '@components/Sidebar';

import actions from '@redux/actions';

const Layout = ({ children, title, isAuthenticated, deauthenticate }) => (
  <>
    {isAuthenticated ? (
      <>
        <Sidebar />
        <div>{children}</div>
      </>
    ) : (
      <Login />
    )}
  </>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStateToProps, actions)(Layout);
