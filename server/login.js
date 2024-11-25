const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./config/mongodb');
const passportConfig = require('./config/passport');
const { login, register, logout } = require("./controllers/auth");
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



// login/register a user
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/logout', logout);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});