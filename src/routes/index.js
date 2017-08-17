module.exports = function(app) {
  app.get('/',function(req,res) {
    // console.log(req.cookies.session_id);
    if(!req.signedCookies.session_id) {
      res.redirect('/login');
      return;
    }
    res.render("timeline"); // pug表示
    // res.send("Initialized!:" + req.signedCookies.session_id);
  });
  
  require('./users')(app); // 読み込んで実行してる
};