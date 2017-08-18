const Toot = require('../models/toot');
const User = require('../models/user');
const UserSession = require('../models/user_session');

module.exports = function(app) {
  app.get('/',function(req,res) {
    // console.log(req.cookies.session_id);
    if(!req.rocals.currentUser) {
      res.redirect('/login');
      return;
    }

    res.locals.currentUser.toots().then((toots) => {
      res.render('timeline', { toots: toots });
    }).catch((err) => {
      console.log(err);
      res.render("timeline", { error: true }); // pug表示
    });
    // res.send("Initialized!:" + req.signedCookies.session_id);
  });

  app.post('/new_toot', function(req,res) {
    if(!res.locals.currentUser) {
      res.redirect("/login");
      return;
    }
    
    Toot.create(res.locals.currentUser,req.body.toot).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
      res.redirect('/');
    });
  });
  
  require('./users')(app); // 読み込んで実行してる
};