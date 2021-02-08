import Link from 'next/link';
import { connect } from 'react-redux';

import Login from '@components/Login';

import actions from '@redux/actions';

const Layout = ({ children, title, isAuthenticated, deauthenticate }) => (
  <>
    {isAuthenticated ? (
      <div>
        <div className="tabs is-centered">
          <ul>
            <Link href="/">
              <a>Strona główna</a>
            </Link>
            {!isAuthenticated && (
              <Link href="/signin">
                <a>Logowanie</a>
              </Link>
            )}
            {isAuthenticated && (
              <li onClick={deauthenticate}>
                <a>Wyloguj się</a>
              </li>
            )}
            <Link href="/whoami">
              <a>Sprawdzenie konta</a>
            </Link>
          </ul>
        </div>
        <div>{children}</div>
      </div>
    ) : (
      <Login />
    )}
  </>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStateToProps, actions)(Layout);
