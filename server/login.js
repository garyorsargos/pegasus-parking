const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
var crypto = require('crypto');
const app = express();
const uri = "mongodb+srv://dbAdmin6829:dbPass4331%23%24%25@poosdcluster.xfeza.mongodb.net/?retryWrites=true&w=majority&appName=PoosdCluster";

app.use(express.json());

// connect to mongo db
const client = new MongoClient(uri, {
   serverApi: {
     version: ServerApiVersion.v1,
     strict: true,
     deprecationErrors: true,
   }
});
 async function run() {
   try {
     await client.connect();
     console.log("You successfully connected to MongoDB!");
   } catch (error) {
     console.error("Error connecting to MongoDB:", error);
   }
}
run().catch(console.dir);

// uses passport local storage to find username and hash the password and compare it to db hashed password
function hashPassword(password, salt) {
   return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
         if (err) reject(err);
         resolve(hashedPassword.toString('hex'));
      });
   });
}

// logs in a user
app.post('/api/login', async (req, res) => {
   const { username, password } = req.body;

   try {
      const database = client.db("PegasusParking");
      const users = database.collection("Users");
      const user = await users.findOne({ userName: username });

      if (!user) {
         return res.status(401).json({ error: "Username not found." });
      }

      const hashedPassword = await hashPassword(password, user.salt);
      if (hashedPassword !== user.hashedPassword) {
         return res.status(401).json({ error: "Incorrect Password." });
      }

      return res.json({
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
});

// register a user
app.post('/api/register', async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
   }

   try {
      const database = client.db("PegasusParking");
      const users = database.collection("Users");

      // checks if username taken
      const existingUser = await users.findOne({ userName: username });
      if (existingUser) {
         return res.status(400).json({ error: "Username already exists." });
      }

      // makes salt and hashes password with that salt
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await hashPassword(password, salt);

      // add new user into database
      const newUser = {
         userName: username,
         userId: Date.now().toString(), // using date cause idk how to get it to increment
         hashedPassword,
         salt
      };
      await users.insertOne(newUser);

      return res.json({ message: "User registered successfully!" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while registering." });
   }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});