const createError = require('http-errors');
const axios = require('axios');

async function getRequest(url, headers) {
    let response;
    try {
        response = await axios.get(url, { headers });
    } catch (e) {
        console.error(e.toString());
        throw createError(500, 'Error accessing external source, please try again later');
    }
    return response;
}

async function checkResponse(response) {
    let result = response;
    if (response && response.status >= 300 && response.status <= 400 && response.headers.location) {
        result = await getRequest(response.headers.location);
    } else if (response.status >= 400) {
        createError(500, 'The service is temporarily unavailable, please try again later');
    }
    if (!result || result.status !== 200) {
        createError(500, 'The service is temporarily unavailable, please try again later');
    }
    return result;
}


module.exports = {
    getRequest,
    checkResponse,
};
