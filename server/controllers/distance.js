const mongoose = require('mongoose');
const Garages = require('../models/garage');
const createApiResponse = require('../utils/apiResponse');

//if you want to test the postman your self use this json:
//{
//    "permitList" : ["Emp", "Br", "C"],
//    "destinationLat" : 28.603017780901947,
//    "destinationLng" : -81.19856071680208
//}
const fetchDistance = async (req, res) => {
    // body is a list of permits and a lat/lng 
    const { permitList, destinationLat, destinationLng } = req.body;
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

    // find garages with permits in permitList
    const garages = await Garages.find({ permit: { $in: permitList } });

    if (!destinationLat || !destinationLng) {
        return res.status(404).json(createApiResponse(false, "ERROR", "Enter a Latitude and Longitude."));
    }
    const result = [];

    for (let i = 0; i < garages.length; i++) {
        const lat1 = garages[i].lat;
        const lng1 = garages[i].lng;

        const body = {
            origin: { location: { latLng: { latitude: lat1, longitude: lng1 } } },
            destination: { location: { latLng: { latitude: destinationLat, longitude: destinationLng } } },
            travelMode: "WALK",
            computeAlternativeRoutes: false,
            units: "IMPERIAL"
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.API_KEY,
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
                permits: garages[i].permit,
                distance: distance,
                time: `${min}`,
                polyline: encodedPolyline,
                latitude: garages[i].lat,
                longitude: garages[i].lng
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
    res.json(createApiResponse(true, null, null, result));
}

module.exports = fetchDistance;