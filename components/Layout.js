import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './Layout.module.scss';

import Login from '@components/Login';
import Sidebar from '@components/Sidebar';

import actions from '@redux/actions';

let cx = classNames.bind(styles);

const Layout = ({ children, isAuthenticated }) => (
  <>
    {isAuthenticated ? (
      <>
        <Sidebar />
        <div className={cx('wrapper')}>{children}</div>
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
