// const mongoose = require("mongoose");

// // Card Schema

// const LocationSchema = mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   locationname: {
//     type: String,
//     required: true
//   },

//   location: { 
//         type: {
//             type: String,
//         },
//         coordinates: {
//             type: [[[Number]]],
//             required: true
//         },
//     }
// });

// // const GeoSchema = mongoose.Schema({
// //     location: {        
// //         type: String,
// //         coordinates:[[]]  
// //     }
// // })
// LocationSchema.index({ location: "2dsphere" });

// const Location = mongoose.model("Location", LocationSchema);




// Location.getLocationById = function (id, callback) {
//   Location.findById(id, callback);
// };

// Location.getLocationByUsername = function (username, callback) {
//   const query = {
//       username: username
//   };
//   Location.findOne(query, callback);
// };

// Location.addLocationData = function (newLocaiton, callback) {
//   newLocaiton.save(callback);
// }

// Location.updateLocation = function (username, newLocation, callback) {
//   const query = { username: username };
  
//   const updatelocal = {
//     locationname: newLocation.locationname,
//     location: newLocation.location 
//   };


//   Location.findOneAndUpdate(query, updatelocal, {
//       new: true,
//       useFindAndModify: false
//   }, callback);
// };

// module.exports = Location;


