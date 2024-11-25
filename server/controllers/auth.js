const Users = require('../models/user');

const login = async (req, res) => {
   const { userName, password } = req.body;

   if (!userName || !password) {
      return res.status(400).json({ error: "Username and password are required." });
   }

   try {
      //locates the user in the database
      const user = await Users.findOne({ userName: userName });

      if (!user) {
         return res.status(401).json({ error: "Username not found." });
      }

      //makes sure that the password inputed is correct
      const validPassword = user.authenticate(password);

      if (!validPassword) {
         return res.status(401).json({ error: "Incorrect: Password." });
      }

      return res.status(200).json({
         message: "Login Successful!",
         user: {
            username: user.userName,
            userId: user.userId
         }
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while logging in." });
   }
}

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
      if(firstName) user.firstName = firstName;
      if(lastName) user.lastName = lastName;

      //save this user to the database
      await user.save();

      return res.status(200).json({ message: "User registered successfully!" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while registering." });
   }
}

module.exports = {
   login,
   register,
}