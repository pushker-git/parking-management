module.exports = {

    "db": {
        // DB_HOST: "localhost",
        // DB_NAME: 'testdb',
        // DB_USER: 'admin',
        // DB_PASS: '1234',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    }
}