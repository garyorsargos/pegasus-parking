const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./config/mongodb');
const passportConfig = require('./config/passport');
const { login, register, logout, getUserInfo } = require("./controllers/auth");
const { setPermit, deletePermit, getPermits, getPermitStrings, editPermit } = require('./controllers/permit');
const fetchDistance = require('./controllers/distance');
const checkPermits = require('./controllers/checkPermit');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(session({
  secret: process.env.AUTH_SECRET,
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
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/getUserInfo', getUserInfo);

//Google map distance calculation
app.use('/fetchDistance', fetchDistance);

//Permit API calls
app.use('/setPermit', setPermit);
app.use('/deletePermit', deletePermit);
app.use('/checkPermits', checkPermits);
app.use('/getPermits', getPermits);
app.use('/getPermitStrings', getPermitStrings);
app.use('/editPermit', editPermit);

app.get('/test', (req, res) => {
      res.send('Application Route Returned')
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
