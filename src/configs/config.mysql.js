require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.MYSQL_DB_HOST,
        "port": process.env.MYSQL_DB_PORT,
        "dialect": "mysql",
        "define": {
            freezeTableName: true,
        }
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
};

// dev: {
//     HOST: process.env.MYSQL_DB_HOST,
//     USER: process.env.DB_USER,
//     PASSWORD: process.env.DB_PASSWORD,
//     DB: process.env.DB_NAME,
//     PORT: process.env.MYSQL_DB_PORT,
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }

// const config = {dev}

// module.exports = config['dev'];