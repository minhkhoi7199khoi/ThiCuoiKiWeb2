// const LRU = require('lru-cache');
 const categoryModel = require('../models/category.model');

// const GLOBAL_CATEGORIES = 'globalCategories';
// const cache = new LRU({
//   max: 500,
//   maxAge: 1000 * 60
// })

module.exports = function (app) {
  app.use( function (req, res, next) {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }
    res.locals.lcIsAdmin = req.session.isAdmin
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  })
  app.use(async function (req, res, next) {
    res.locals.lcCategories = await categoryModel.allWithDetails();
    next();
  })

  // app.use(async function (req, res, next) {
  //   const data = cache.get(GLOBAL_CATEGORIES);
  //   if (!data) {
  //     console.log('-- fetch `globalCategories');
  //     const rows = await categoryModel.allWithDetails();
  //     res.locals.lcCategories = rows;
  //     cache.set(GLOBAL_CATEGORIES, rows);
  //   } else {
  //     console.log('++ cache hit for `globalCategories');
  //     for (const c of data) {
  //       delete c.isActive;
  //     }
  //     res.locals.lcCategories = data;
  //   }

  //   next();
  // })
}
