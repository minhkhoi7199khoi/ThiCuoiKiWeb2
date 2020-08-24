const db = require('../utils/db');

const TBL_CATEGORIES = 'categories';

module.exports = {
  all: function () {
    return db.load(`select * from ${TBL_CATEGORIES}`);
  },
  allWithDetails: function () {
    return db.load(`
      select c.*, count(p.ProID) as num_of_products
      from ${TBL_CATEGORIES} c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName`);
  },
  single: function (id) {
    return db.load(`select * from ${TBL_CATEGORIES} where CatID = ${id}`);
  },
  add: function (entity) {
    return db.add(TBL_CATEGORIES, entity);
  },
  patch: function (entity) {
    const condition = {
      CatID: entity.CatID
    }
    delete entity.CatID;
    return db.patch(TBL_CATEGORIES, entity, condition);
  },
  del: function (id) {
    const condition = {
      CatID: id
    }
    return db.del(TBL_CATEGORIES, condition);
  }
};
