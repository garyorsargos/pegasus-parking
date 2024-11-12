const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
var crypto = require('crypto');
const app = express();
const uri = "mongodb+srv://dbAdmin6829:dbPass4331%23%24%25@poosdcluster.xfeza.mongodb.net/?retryWrites=true&w=majority&appName=PoosdCluster";

app.use(express.json());

app.use(session({
   secret: 'g3rb3r1$cr4zy*()43', // random "secure" key I made
   resave: false,
   saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

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
passport.use(new LocalStrategy(
   async (username, password, cb) => {
      try {
         const database = client.db("PegasusParking");
         const users = database.collection("Users");
         const user = await users.findOne({ userName: username });
         if (!user) {
           return cb(null, false, { message: "Username not found." });
         }

         // hashes password with sha2-256 encryption using a randomly generated user's salt value to make it more secure from rainbow tables
         crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) return cb(err);
            if (hashedPassword.toString('hex') !== user.hashedPassword) {
               return cb(null, false, { message: "Incorrect Password." });
            }
            return cb(null, user);
         });
      } catch (error) {
         return cb(error);
      }
   }
));

// Serialization and Deserialization for sessions
passport.serializeUser(function(user, cb) {
   process.nextTick(function() {
      cb(null, {id: user.userId , username: user.userName});
   })
});

passport.deserializeUser(function(user, cb) {
   process.nextTick(function() {
     return cb(null, user);
   });
});

// logs in a user
app.post('/api/login', (req, res, cb) => {
   passport.authenticate('local', (err, user, info) => {
      if (!user) return res.status(401).json({ error: info.message });
      req.logIn(user, (err) => {
         if (err) {
            return cb(err);
         }
         return res.json({
            message: "Login Successful!",
            user: {
               username: user.userName,
               userId: user.userId
            }
         });
      });
   })(req, res, cb);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});