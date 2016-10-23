/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import Todo from './Todo';

User.hasMany(Todo, {
    foreignKey: 'userId',
    as: 'todos',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

User.hasMany(UserLogin, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

User.hasMany(UserClaim, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

User.hasOne(UserProfile, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});


async function sync(...args) {
    console.log("#######",1)
    let ret = await sequelize.sync(...args);
    try {
        setTimeout(async function () {
            console.log("#########",2)
            const ret = await User.create({
                id: 1,
                email: "blackmiaoolblackmiaoo3l@qq.com",
                todos: [],
                logins: [{
                    name: "traveller",
                    key: "1"
            }, ],
            }, {
                logging: function () {
                    //prevent error log
                }
            });
        }, 3000);

    } catch (e) {}
    return ret;
}

export default {
    sync
};
export {
    User,
    UserLogin,
    UserClaim,
    UserProfile,
    Todo
};