// config/apiKeys.js
require('dotenv').config();

module.exports = {
    // Weather APIs
    openWeather: {
        apiKey: process.env.OPENWEATHER_API_KEY,
        baseURL: 'https://api.openweathermap.org/data/2.5'
    },
    
    // Government Agriculture APIs
    governmentAPIs: {
        eNAM: {
            apiKey: process.env.ENAM_API_KEY,
            secret: process.env.ENAM_API_SECRET,
            baseURL: 'https://enam.gov.in/api/v1'
        },
        IMD: {
            apiKey: process.env.IMD_API_KEY,
            baseURL: 'https://mausam.imd.gov.in/api'
        },
        KisanSuvidha: {
            apiKey: process.env.KISAN_SUVIDHA_API_KEY,
            baseURL: 'https://data.gov.in/api'
        }
    },
    
    // Maps and Location
    maps: {
        googleMaps: process.env.GOOGLE_MAPS_API_KEY
    },
    
    // Cloud Services
    cloud: {
        aws: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'ap-south-1'
        },
        azure: {
            apiKey: process.env.AZURE_API_KEY
        }
    },
    
    // Other APIs
    rapidAPI: process.env.RAPIDAPI_KEY
};