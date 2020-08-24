const express = require('express');
const app = express();
require('express-async-errors');

//mdw
app.use(express.urlencoded({
  extended: true
}));
app.use('/public', express.static('public'));
require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/locals.mdw')(app);

//routers
// app.use('/admin/products', require('./routes/product.route'));
// app.use('/products', require('./routes/_product.route'));
// app.use('/demo', require('./routes/_demo.route'));
app.get('/home',function(req,res){
  res.render('home')
})
app.use('/admin', require('./routes/admin.router'));
app.use('/account', require('./routes/account.router'));

//404, 500
app.use(function (req, res) {
  res.render('404', { layout: false });
})
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('500', { layout: false });
})

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running at http://localhost:${PORT}`);
})