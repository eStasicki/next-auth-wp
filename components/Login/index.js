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
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Login"
                required
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Hasło"
                required
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-text-centered">
              <button type="submit" className="button is-success">
                Zaloguj się
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default connect((state) => state, actions)(Login);
