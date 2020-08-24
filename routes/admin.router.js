const express = require('express');
const router = express.Router();
router.get('/all', function(req, res){
    res.render('viewAdmin/all')
})
module.exports=router