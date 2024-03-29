const dev = {
    mongo_db: {
        HOST: process.env.MONGO_DB_HOST,
        PORT: process.env.MONGO_DB_PORT,
        NAME: process.env.DB_NAME,
    }
}

const config = {dev}

module.exports = config['dev']