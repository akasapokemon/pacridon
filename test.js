const UserSession = require('./src/models/user_session');

let session = new UserSession({ user_id: 1});
session.save().then((s) => {
  console.dir(s);
  s.data.user_id = 3;
  s.save().then((ss) => {
    console.dir(ss);
  })
})

// User.find(1).then((user) => {
//   console.log(user);
//   user.toots().where({id: 3}).then((toots) => {
//     console.log(toots.length);
//     console.dir(toots);
//   });
// });