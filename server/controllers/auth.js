const Users = require('../models/user');
const passport = require('passport');
const createApiResponse = require('../utils/apiResponse');
const MessageTypes = require('../utils/messageTypes');

const login = (req, res, cb) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return cb(err);
    if (!user) return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, info.message));

    req.logIn(user, (err) => {
      console.log("Session after login:", req.session);
      if (err) return cb(err);

      res.json(createApiResponse(true, MessageTypes.SUCCESS, 'Login Successful!', {
        username: user.userName,
        userId: user.userId,
        firstname: user.firstName,
        lastname: user.lastName,
      }));
    });
  })(req, res, cb);
};

const register = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json(createApiResponse(false, MessageTypes.ERROR, "Username and password are required."));
  }

  try {
    // checks if username taken
    const existingUser = await Users.findOne({ userName: userName });

    if (existingUser) {
      return res.status(400).json(createApiResponse(false, MessageTypes.ERROR, "Username already exists."));
    }

    //creates a new user
    const user = new Users({ userName, password });

    //optional fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    //save this user to the database
    await user.save();

    return res.status(200).json(createApiResponse(true, MessageTypes.SUCCESS, "User registered successfully!"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred while registering."));
  }
};

const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred during logout."));
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred while destroying the session."));
        }
        res.clearCookie('connect.sid'); // clears user session
        return res.json(createApiResponse(true, MessageTypes.SUCCESS, "Logout successful!"));
      });
    });
  } catch (error) {
    return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, "An error occurred while Logging Out."));
  }
};

const getUserInfo = (req, res) => {
  if (!req.user) {
    return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, 'User is not authenticated'));
  }

  Users.findOne({ userId: req.user.userId })
    .then(user => {
      if (!user) {
        return res.status(404).json(createApiResponse(false, MessageTypes.ERROR, 'User not found'));
      }

      const { userName, firstName, lastName } = user;
      res.json(createApiResponse(true, null, null, {
        username: userName,
        firstName,
        lastName
      }));
    })
    .catch(err => {
      console.error('Error fetching user info:', err);
      res.status(500).json(createApiResponse(false, MessageTypes.ERROR, 'Internal server error'));
    });
};

const deleteAccount = async (req, res) => {
  if (!req.user) {
    return res.status(401).json(createApiResponse(false, MessageTypes.ERROR, 'User is not authenticated.'));
  }

  try {
    const deletedUser = await Users.findOneAndDelete({ userId: req.user.userId });

    if (!deletedUser) {
      return res.status(404).json(createApiResponse(false, MessageTypes.ERROR, 'User not found.'));
    }

    req.logout((err) => {
      if (err) {
        return res.status(500).json(createApiResponse(false, MessageTypes.ERROR, 'Error logging out after account deletion.'));
      }

      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json(createApiResponse(true, MessageTypes.SUCCESS, 'Account deleted successfully.'));
      });
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json(createApiResponse(false, MessageTypes.ERROR, 'Internal server error.'));
  }
};

module.exports = {
  login,
  register,
  logout,
  getUserInfo,
  deleteAccount,
};