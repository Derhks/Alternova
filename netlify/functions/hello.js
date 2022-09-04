
exports.handler = async function (event, context) {
    const axios = require('axios');

    const response = await axios.get('https://api.chucknorris.io/jokes/random');

    return {
        statusCode: 200,
        body: JSON.stringify({ data: response.data.value }),
    };
};
