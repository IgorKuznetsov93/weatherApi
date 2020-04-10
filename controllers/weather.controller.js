const NodeCache = require('node-cache');
const createError = require('http-errors');
const { openWeatherApi } = require('../config/config');
const { getRequest, checkResponse } = require('../helpers');

const stdTTL = 60 * 10; // cache for 10 minutes because  openWeatherApi updates data every 10 minutes
const cache = new NodeCache({ stdTTL, deleteOnExpire: true });

async function getCurrentWeatherByCity(cityName, units) {
    const weather = cache.get(cityName + units);
    if (weather) {
        return weather;
    }
    const url = `${openWeatherApi.url}?q=${encodeURIComponent(cityName)}&units=${units}&appId=${openWeatherApi.apiKey}`;
    let response = await getRequest(url);
    response = await checkResponse(response);
    if (!response.data) {
        throw createError(500, 'Could not get the weather in the current city');
    }
    cache.set(cityName + units, response.data);
    return response.data;
}

module.exports = {
    getCurrentWeatherByCity,
};
