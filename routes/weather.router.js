const weatherRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const { getCurrentWeatherByCity } = require('../controllers');

weatherRouter.get('/', asyncHandler(async (req, res) => {
    const { cityName } = req.query;
    if (!cityName) {
        createError(400, 'CityName must be defined');
    }
    let { units } = req.query;
    if (units !== 'imperial') {
        units = 'metric';
    }
    res.send(await getCurrentWeatherByCity(cityName, units));
}));

module.exports = weatherRouter;
