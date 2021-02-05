import axios from 'axios';
import { connect } from 'react-redux';
import { API } from '../config';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Whoami = ({ user, getAllPosts, userRole }) => (
  <Layout title="Who Am I">
    {(user && (
      <>
        <h3 className="title is-3">
          You are logged in as{' '}
          <strong className="is-size-2 has-text-primary">{user}</strong>.
        </h3>
        <Query query={getAllPosts}>
        {({ loading, error, data }) => {
            if (loading) return <div>Wczytywanie...</div>;
            if (error) return false;
            return (
              <div>
                {data.posts.nodes.length > 0 ? (
                  <>
                    {data.posts.nodes.map((post) => (
                      <p key={post.id}>{post.title}</p>
                    ))}
                  </>
                ) : (
                  'Nie posiadasz żadnych projektów'
                )}
              </div>
            );
          }}
        </Query>
        <hr />
        <h3>Dodatkowe informacje o użytkowniku:</h3>
        <p>Rola: {userRole}</p>
      </>
    )) || (
      <h3 className="title is-3 has-text-danger	">Nie jesteś zweryfikowany.</h3>
    )}
  </Layout>
);

Whoami.getInitialProps = async ctx => {
  initialize(ctx);
  const token = ctx.store.getState().authentication.token;
  if (token) {
    const response = await axios.get(`${API}/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    const user = response.data.name;
    const userID = response.data.id;
    const userRole = response.data.roles;
    console.log(response.data);
    const getAllPosts = gql`
    {
      posts(where: { author: ${ userID  } }) {
        nodes {
          title
          id
        }
      }
    }
    `;
    return {
      user,
      getAllPosts,
      userRole
    };
  }
};

export default connect(state => state)(Whoami);
