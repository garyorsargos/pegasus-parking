const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./config/mongodb');
const passportConfig = require('./config/passport');
const { login, register, logout } = require("./controllers/auth");
const fetchDistance = require('./controllers/distance');
//for next PR
//const setPermit = require('./controllers/permit');
const app = express();

app.use(express.json());

app.use(session({
  secret: 'g3rb3r1$cr4zy*()43', // random key I made, should be changed
  resave: false,
  saveUninitialized: true,
  // uncomment when used on https
  // cookie: {
  //   secure: true, 
  //   httpOnly: true, 
  //   sameSite: 'strict',
  //},
}));

app.use(passport.initialize());
app.use(passport.session());

//connect to the mongodb PegasusParking database through mongoose.
connectToDatabase();

//Passport Configuration
passportConfig(passport);

// login/register/logout a user
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/fetchDistance', fetchDistance);
//for next PR
//app.use('/setPermit', setPermit);

app.get('/', (req, res) => {
      res.send('Application Base Route Returned')
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
