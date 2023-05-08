/* eslint-disable linebreak-style */
import * as functions from "firebase-functions";
import axios from "axios";
import * as admin from "firebase-admin";
admin.initializeApp();


exports.addMessage = functions.https.onCall(async (data, context) => {
  const {auth} = context;

  if (!auth) {
    throw new functions.https.HttpsError("unauthenticated",
      "You must be logged in to call this function.");
  }

  try {
    // Verify that the user calling the function is valid
    const userRecord = await admin.auth().getUser(auth.uid);
    if (!userRecord) {
      throw new functions.https.HttpsError("permission-denied",
        "You do not have permission to call this function.");
    }

    const {latitude, longitude} = data;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAQAen09Fg70paaU2FWaCL_t7DcJtMGXDU`
    );

    if (response.data.results.length > 0) {
      const locationName = response.data.results[0].formatted_address;
      return {name: locationName, res: response.data};
    } else {
      return {name: "Unknown"};
    }
  } catch (error) {
    console.log("Errro", error);
    return {errorr: error};
  }
});


exports.getLocationSuggestions = functions.https
  .onCall(async (data, context) => {
    // Verify that the user is authenticated
    const {auth} = context;
    if (!auth) {
      throw new functions.https.HttpsError("unauthenticated",
        "You must be authenticated to call this function.");
    }
    const userRecord = await admin.auth().getUser(auth.uid);
    if (!userRecord) {
      throw new functions.https.HttpsError("permission-denied",
        "You do not have permission to call this function.");
    }

    // Verify that the query parameter is provided
    if (!data.query) {
      throw new functions.https.HttpsError("invalid-argument",
        "The query parameter is required.");
    }

    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
        params: {
          input: data.query,
          types: "geocode",
          key: "AIzaSyAQAen09Fg70paaU2FWaCL_t7DcJtMGXDU",
        },
      });

      const predictions = response.data.predictions
        .map((prediction: {
          place_id: any; description: any;
        }) => {
          return {
            description: prediction.description,
            placeId: prediction.place_id,
          };
        });

      return {suggestions: predictions};
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError("internal",
        "An error occurred while retrieving location suggestions.");
    }
  });


exports.getLongAndLat = functions.https
  .onCall(async (data) => {
    // Verify that the query parameter is provided
    if (!data.placeId) {
      throw new functions.https.HttpsError("invalid-argument",
        "The placeId parameter is required.");
    }

    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
        params: {
          place_id: data.placeId,
          fields: "geometry",
          key: "AIzaSyAQAen09Fg70paaU2FWaCL_t7DcJtMGXDU",
        },
      });
      const location = response.data.result.geometry.location;
      return {latitude: location.lat, longitude: location.lng};
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError("internal",
        "An error occurred while retrieving location suggestions.");
    }
  });
