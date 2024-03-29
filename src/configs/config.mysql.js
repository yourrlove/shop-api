const dev = {
    mysql_db: {
        HOST: process.env.MYSQL_DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_NAME,
        PORT: process.env.MYSQL_DB_PORT,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

const config = {dev}

module.exports = config['dev'];