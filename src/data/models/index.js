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

//User.hasMany(UserLogin, {
//  foreignKey: 'userId',
//  as: 'logins',
//  onUpdate: 'cascade',
//  onDelete: 'cascade',
//});
//
//User.hasMany(UserClaim, {
//  foreignKey: 'userId',
//  as: 'claims',
//  onUpdate: 'cascade',
//  onDelete: 'cascade',
//});
//
//User.hasOne(UserProfile, {
//  foreignKey: 'userId',
//  as: 'profile',
//  onUpdate: 'cascade',
//  onDelete: 'cascade',
//});
//var fs        = require("fs");
//var path      = require("path");
//var Sequelize = require("sequelize");
//var env       = process.env.NODE_ENV || "development";
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
//if (process.env.DATABASE_URL) {
//  var sequelize = new Sequelize(process.env.DATABASE_URL);
//} else {
//  var sequelize = new Sequelize(config.database, config.username, config.password, config);
//}
//var db        = {};
//
//fs
//  .readdirSync(__dirname)
//  .filter(function(file) {
//    return (file.indexOf(".") !== 0) && (file !== "index.js");
//  })
//  .forEach(function(file) {
//    var model = sequelize.import(path.join(__dirname, file));
//    db[model.name] = model;
//  });
//
//Object.keys(db).forEach(function(modelName) {
//  if ("associate" in db[modelName]) {
//    db[modelName].associate(db);
//  }
//});
//
//db.sequelize = sequelize;
//db.Sequelize = Sequelize;
//
//module.exports = db;




function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserClaim, UserProfile ,Todo};
