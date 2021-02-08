import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './Login.module.scss';

import initialize from '@utils/initialize';

import actions from '@redux/actions';

let cx = classNames.bind(styles);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(
      { username: this.state.username, password: this.state.password },
      'signin'
    );
  }

  render() {
    return (
      <div className={cx('wrapper')}>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className={cx('container')}
        >
          <div className={cx('field')}>
            <input
              className={cx('input')}
              type="text"
              placeholder="Login"
              required
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div className={cx('field')}>
            <input
              className={cx('input')}
              type="password"
              placeholder="Hasło"
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className={cx(['field', 'button-field'])}>
            <button type="submit" className={cx('submit')}>
              Zaloguj się
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect((state) => state, actions)(Login);
