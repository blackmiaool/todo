/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export default {

    path: '/',

    async action() {
        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            //      body: JSON.stringify({
            //        query: '{news{title,link,contentSnippet}}',
            //      }),
            body: JSON.stringify({
                query: '{todo{content,state,process,id}}',
            }),
            credentials: 'include',
        });
        const {
            data
        } = await resp.json();
        if (!data || !data.todo) throw new Error('Failed to load the news feed.');
//        console.log(data);
        return {
            title: 'React Starter Kit',
            component: <Home todo={data.todo} />,
        };
    },

};