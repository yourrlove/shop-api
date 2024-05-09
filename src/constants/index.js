require('dotenv').config();

const configs = {
    "development": {
        WEB_DOMAIN_URL: "http://localhost:3000",
        CLOUD_IMAGE_FOLDER: "products/"
    },
    "production": {
        WEB_DOMAIN_URL: "https://api.yourrlove.com",
        CLOUD_IMAGE_FOLDER: "products/"
    }
}

module.exports = {
    config: configs[process.env.NODE_ENV.trim() || 'development']
}