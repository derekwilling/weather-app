const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGlydHlzb2MiLCJhIjoiY2p1MW1rbXp2MDM3djQzbG8wZDMweWJrcyJ9.Ci4FbZRJdLzZ1hZ96meH-w&limit=1'

    request({ url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude:body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

// Geocoding
// const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Woodstock%20GA.json?access_token=pk.eyJ1IjoiZGlydHlzb2MiLCJhIjoiY2p1MW1rbXp2MDM3djQzbG8wZDMweWJrcyJ9.Ci4FbZRJdLzZ1hZ96meH-w&limit=1"
// request({url: mapURL, json: true}, (error, response) => {
//     if (error) {
//         console.log('Error accessing mapbox api!')
//     } else if (response.body.features.length === 0) {
//         console.log('Location not found with mapbox!')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// })