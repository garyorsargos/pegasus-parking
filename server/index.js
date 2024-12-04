const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./config/mongodb');
const passportConfig = require('./config/passport');
const { login, register, logout, getUserInfo } = require("./controllers/auth");
const { setPermit, deletePermit, getPermits, getPermitStrings } = require('./controllers/permit');
const fetchDistance = require('./controllers/distance');
const checkPermits = require('./controllers/checkPermit');
const app = express();

app.use(express.json());

app.use(session({
  secret: 'g3rb3r1$cr4zy*()43', // random key I made, should be changed
  resave: false,
  saveUninitialized: true,
  // uncomment when used on https
  cookie: {
     secure: false, 
     httpOnly: true, 
     sameSite: 'strict',
  },
}));

app.use(passport.initialize());
app.use(passport.session());

//connect to the mongodb PegasusParking database through mongoose.
connectToDatabase();

//Passport Configuration
passportConfig(passport);

// login/register/logout a user
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/logout', logout);
app.use('/api/getUserInfo', getUserInfo);

//Google map distance calculation
app.use('/api/fetchDistance', fetchDistance);

//Permit API calls
app.use('/api/setPermit', setPermit);
app.use('/api/deletePermit', deletePermit);
app.use('/api/checkPermits', checkPermits);
app.use('/api/getPermits', getPermits);
app.use('/api/getPermitStrings', getPermitStrings);

app.get('/api/test', (req, res) => {
      res.send('Application Route Returned')
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});