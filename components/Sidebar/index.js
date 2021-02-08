import classNames from 'classnames/bind';
import Link from 'next/link';
import { connect } from 'react-redux';

import styles from './Sidebar.module.scss';

import actions from '@redux/actions';

let cx = classNames.bind(styles);

const Sidebar = ({ deauthenticate }) => (
  <nav className={cx('sidebar')}>
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
