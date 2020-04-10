const weatherController = require('./weather.controller');

module.exports = {
    getCurrentWeatherByCity: weatherController.getCurrentWeatherByCity,
};
