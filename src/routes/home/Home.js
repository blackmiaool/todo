/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Home.css';

function Home({ todo,email }) {
  return (
    <Layout  todo={todo} email={email}>
    <div></div>
    </Layout>
  );
}

Home.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    process: PropTypes.number,
  })).isRequired,
};

export default withStyles(s)(Home);
