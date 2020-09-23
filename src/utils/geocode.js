const request = require('postman-request')
require('dotenv').config();

const geocode = (location, callback) => {
    const API_KEY_GEOCODE = process.env.GEOCODE_KEY    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${API_KEY_GEOCODE}&limit=1`

    request({ url, json: true }, (error, {body:{features}}={}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[0],
                longitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode