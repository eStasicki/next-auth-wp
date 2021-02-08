import Link from 'next/link';
import { connect } from 'react-redux';

import Login from '@components/Login';

import actions from '@redux/actions';

const Sidebar = ({ children, title, isAuthenticated, deauthenticate }) => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Strona główna</a>
        </Link>
      </li>
      <li>
        <Link href="/whoami">
          <a>Mój profil</a>
        </Link>
      </li>
      <li onClick={deauthenticate}>
        <a>Wyloguj się</a>
      </li>
    </ul>
  </nav>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStateToProps, actions)(Sidebar);
