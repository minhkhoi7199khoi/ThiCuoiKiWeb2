const db = require('../utils/db');

const TBL_USERS = 'users';

module.exports = {
  all: function () {
    return db.load(`select * from ${TBL_USERS}`);
  },
  single: function (id) {
    return db.load(`select * from ${TBL_USERS} where f_ID = ${id}`);
  },
  singleByUserName: async function (username) {
    const rows = await db.load(`select * from ${TBL_USERS} where f_Username = '${username}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },
  add: function (entity) {
    return db.add(TBL_USERS, entity);
  },
  patch: function (entity) {
    const condition = {
      f_ID: entity.f_ID
    }
    delete entity.id;
    return db.patch(TBL_USERS, entity, condition);
  },
  del: function (id) {
    const condition = { id }
    return db.del(TBL_USERS, condition);
  }
};
