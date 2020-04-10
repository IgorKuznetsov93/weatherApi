const { openWeatherApi } = require('../config/config');
const { getRequest, checkResponse } = require('../helpers');

async function getCurrentWeatherByCity(cityName, units) {
    const url = `${openWeatherApi.url}?q=${encodeURIComponent(cityName)}&units=${units}&appId=${openWeatherApi.apiKey}`;
    let response = await getRequest(url);
    response = await checkResponse(response);
    return response.data;
}

module.exports = {
    getCurrentWeatherByCity,
};
