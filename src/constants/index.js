require('dotenv').config();

const configs = {
    "development": {
        WEB_DOMAIN_URL: "http://localhost:3000",
        CLOUD_IMAGE_FOLDER: "products/",
        SIZE: Object.freeze({
            SM: "Small", 
            MD: "Medium", 
            L: "Large", 
            XL: "Extra Large", 
        }),
        COLOR: Object.freeze({
            RD: "Red",
            BL: "Blue",
            GRE: "Green",
            YE: "Yellow",
            OR: "Orange",
            PU: "Purple",
            WH: "White",
            GRA: "Gray",
            BK: "Black",
            BR: "Brown",
            PK: "Pink",
            BE: "Beige"
        })
    },
    "production": {
        WEB_DOMAIN_URL: "https://api.yourrlove.com",
        CLOUD_IMAGE_FOLDER: "products/",
        SIZE: Object.freeze({
            SM: "Small", 
            MD: "Medium", 
            L: "Large", 
            XL: "Extra Large", 
        }),
        COLOR: Object.freeze({
            RD: "Red",
            BL: "Blue",
            GRE: "Green",
            YE: "Yellow",
            OR: "Orange",
            PU: "Purple",
            WH: "White",
            GRA: "Gray",
            BK: "Black",
            BR: "Brown",
            PK: "Pink",
            BE: "Beige"
        })
    }
}

module.exports = {
    config: configs[process.env.NODE_ENV.trim() || 'development']
}