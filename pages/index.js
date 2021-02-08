import { connect } from 'react-redux';

import Layout from '@components/Layout';

import initialize from '@utils/initialize';

const Index = () => (
  <Layout title="Home">
    <h2 className="title is-2">Authentication with Next.js and JWT</h2>
    <img src="/public/nextjs.jpg" />
    <p>
      A proof of concept app, demonstrating the authentication of Next.js
      application using JWT.
    </p>
  </Layout>
);

Index.getInitialProps = function (ctx) {
  initialize(ctx);
};

export default connect((state) => state)(Index);
