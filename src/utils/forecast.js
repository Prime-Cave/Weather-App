const request = require('postman-request');
require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
    const API_KEY_FORECAST =process.env.FORECAST_KEY
    url = `http://api.weatherstack.com/current?access_key=${API_KEY_FORECAST}&query=${longitude},${latitude}&units=f`

    request({ url, json: true }, (error, { body: { success }, body: { current: { weather_descriptions } }, body: { current: { temperature } }, body: { current: { observation_time } }, body: { current: { humidity } }, body:{current:{feelslike}}}={}) => {
        if (error) {
            callback('Unable to connect to Weather service provider', undefined);
        } else if (success === false) {
            callback('There was an issue with the location try another location!', undefined)
        } else {
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. And it feels like ${feelslike} degrees out, Humidity is ${humidity}%. Time of observation is ${observation_time}` )
        }
    })
};

module.exports = forecast;