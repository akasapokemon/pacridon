let crypto = require('crypto');
let mysql = require('mysql');
let User = require('../models/user')

module.exports = function(app){
  app.get('/signup', function(req,res){
    res.render('signup');
  });
  app.post('/signup', function(req, res){

    let connection = mysql.createConnection({
        host     : 'localhost',
        user     :'root',
        database :'pacridon'
    });
    let email = req.body.email;
    let password = req.body.password;
    let nickname = req.body.nickname;
    let id = req.body.id;
    let salt = crypto.randomBytes(8).toString('hex');
    let sha512 = crypto.createHash('sha512');
    sha512.update(salt);
    sha512.update(password);
    let hash = sha512.digest('hex');
    // let hashSet = salt + ':' + hash;
    let user = new User({
      nickname: nickname,
      email: email,
      password: hash,
      salt: salt
    })
    user.save().then(() => {
      res.redirect(302, '/login');
    }, () => {
      res.status(409).send('Nickname または E-mailアドレスが重複しています');
    });
  });
}