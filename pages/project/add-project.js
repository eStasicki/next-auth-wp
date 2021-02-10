import axios from 'axios';
import classNames from 'classnames/bind';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { API } from '../../config';

import Layout from '@components/Layout';

import initialize from '@utils/initialize';

import actions from '@redux/actions';

import styles from '@styles/pages/project/AddProject.module.scss';

let cx = classNames.bind(styles);

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      przykladowe_pole: ''
    };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`${API}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${this.props.authentication?.token || ''}`,
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        status: 'publish',
        acf: {
          przykladowe_pole: this.state.przykladowe_pole,
        },
        przykladowe_pole: this.state.przykladowe_pole,
      }),
    }).then(function(response){
      return response.json();
  }).then(function(post){
      console.log(post);
  });
    //e.target.reset();
      // .then(function (response) {
      //   response.json();
      // })
      //window.location.reload();
  }

  handleButtonClick = () => {
    this.state.title = '';
    this.state.content = '';
  };

  render() {
    return (
      <Layout title="Add project">
        <h2 className="title is-2">Tworzenie nowego projektu</h2>
        <form className={cx('form')} onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <input
            type="text"
            name="przykladowe_pole"
            value={this.state.przykladowe_pole}
            onChange={(e) => this.setState({ przykladowe_pole: e.target.value })}
            className={cx('przykladowe')}
          />
          <textarea
            name="content"
            cols="30"
            rows="10"
            onChange={(e) => this.setState({ content: e.target.value })}
          ></textarea>
          <button type="submit">
            Dodaj projekt
          </button>
        </form>
      </Layout>
    );
  }
}

export default connect((state) => state, actions)(AddProject);
