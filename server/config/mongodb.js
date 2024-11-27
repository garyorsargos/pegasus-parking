const mongoose = require('mongoose');
const uri = "mongodb+srv://dbAdmin6829:dbPass4331%23%24%25@poosdcluster.xfeza.mongodb.net/PegasusParking?retryWrites=true&w=majority&appName=PoosdCluster";

async function connectToDatabase() {
    // connect to MongoDB using Mongoose
    //I don't know what to put for the serverApi, so I didn't include it for now
    await mongoose.connect(uri)
        .then(() => {
            console.log("You successfully connected to MongoDB using Mongoose!");
        })
        .catch(error => {
            console.error("error connecting to MongoDB:", error);
        });
}

module.exports = connectToDatabase;