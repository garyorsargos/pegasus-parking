const express = require('express');
const connectToDatabase = require('./config/mongodb');
const app = express();
const { login, register } = require("./controllers/auth");

app.use(express.json());

//connect to the mongodb PegasusParking database through mongoose.
connectToDatabase();

// login/register a user
app.use('/api/login', login);
app.use('/api/register', register);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});