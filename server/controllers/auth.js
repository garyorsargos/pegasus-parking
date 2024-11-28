const Users = require('../models/user');
const passport = require('passport');

const login = (req, res, cb) => {
   passport.authenticate('local', (err, user, info) => {
      if (err) return cb(err);
      if (!user) return res.status(401).json({ error: info.message });

      req.logIn(user, (err) => {
         if (err) return cb(err);

         res.json({
            message: 'Login Successful!',
            user: {
               username: user.userName,
               userId: user.userId,
               firstname: user.firstName,
               lastname: user.lastName,
            },
         });
      });
   })(req, res, cb);
};

const register = async (req, res) => {
   const { firstName, lastName, userName, password } = req.body;

   if (!userName || !password) {
      return res.status(400).json({ error: "Username and password are required." });
   }

   try {
      // checks if username taken
      const existingUser = await Users.findOne({ userName: userName });

      if (existingUser) {
         return res.status(400).json({ error: "Username already exists." });
      }

      //creates a new user
      const user = new Users({ userName, password });

      //optional fields
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;

      //save this user to the database
      await user.save();

      return res.status(200).json({ message: "User registered successfully!" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while registering." });
   }
}

const logout = async (req, res) => {
   try {
      req.logout((err) => {
         if (err) {
            return res.status(500).json({ error: "An error occurred during logout." });
         }
         req.session.destroy((err) => {
            if (err) {
               return res.status(500).json({ error: "An error occurred while destroying the session." });
            }
            res.clearCookie('connect.sid'); // clears user session
            return res.json({ message: "Logout successful!" });
         });
      });
   }
   catch (error) {
      return res.status(500).json({ error: "An error occurred while Logging Out." });;
   }
};

module.exports = {
   login,
   register,
   logout,
}