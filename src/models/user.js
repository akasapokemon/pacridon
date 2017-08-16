// src/models/user.js
const db = require('../db');
const Record = require('./record');
const Toot = require('./toot');
const Collection = require('./collection');

class User extends Record {
  static tableName() {
    return "users";
  }

  static columns() {
    return ["nickname","email","password","salt"];
  }

  toots() {
    return (new Collection(Toot)).where({ user_id: this.data.id });
  }
  
}

module.exports = User;