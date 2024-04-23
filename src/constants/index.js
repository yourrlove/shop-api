require('dotenv').config();

const configs = {
    "development": {
        WEB_DOMAIN_URL: "http://localhost:3000"
    },
    "production": {
        WEB_DOMAIN_URL: "https://api.yourrlove.com"
    }
}

module.exports = configs[process.env.NODE_ENV.trim() || 'development'];