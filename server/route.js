const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri = "mongodb+srv://dbAdmin6829:dbPass4331%23%24%25@poosdcluster.xfeza.mongodb.net/?retryWrites=true&w=majority&appName=PoosdCluster";

app.use(express.json());

// make mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// connect to mongo client
async function run() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

// Closes mongoDB, try-finally caused errors in run function
process.on('SIGINT', async () => {
  await client.close();
  console.log("MongoDB client closed.");
  process.exit(0);
});

// gets distance between garages and destination
app.post('/api/fetchDistance', async (req, res) => {
  // body is a permit and a destination 
  const { permit, destinationName } = req.body;
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

  const database = client.db("PegasusParking");

  // find garages with permit
  const garagesCollection = database.collection("Garages");
  const garages = await garagesCollection.find({ permit: permit }).toArray();

  const destinationsCollection = database.collection("TestLocations");
  const destination = await destinationsCollection.findOne({ name: destinationName });
  if (!destination) {
    return res.status(404).json({ error: "Destination not found" });
  }
  const { lat: lat2, lng: lng2 } = destination;
  const result = [];

  for (let i = 0; i < garages.length; i++) {
    const lat1 = garages[i].lat;
    const lng1 = garages[i].lng;

    const body = {
      origin: { location: { latLng: { latitude: lat1, longitude: lng1 } } },
      destination: { location: { latLng: { latitude: lat2, longitude: lng2 } } },
      travelMode: "WALK",
      computeAlternativeRoutes: false,
      units: "IMPERIAL"
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyCSxW_PMdBUPdNmdJYsp070JP0CRHrlJrA",
          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!data.routes || data.routes.length === 0) {
        throw new Error("No routes found between the specified locations.");
      }

      const encodedPolyline = data.routes[0].polyline.encodedPolyline;
      const distance = data.routes[0].distanceMeters / 1609.34;
      const time = data.routes[0].duration; 
      const min = Math.floor(parseInt(time) / 60);
      const sec = parseInt(time) % 60;

      result.push({
        garage: garages[i].name,
        distance: distance,
        time: `${min}:${sec}`,
        polyline: encodedPolyline
      })

    } catch (error) {
      console.error(`Error fetching route for ${garages[i].name}:`, error.message);
      result.push({
        garage: garages[i].name,
        error: error.message
      });
    }
  }
    // sort the results by distance
    result.sort((a, b) => a.distance - b.distance);

    // returns encoded polyine for rendering route, distance in miles, time in minutes and seconds
    res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
