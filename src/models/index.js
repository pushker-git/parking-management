const config = require("../config/config.js");
const { Sequelize, DataTypes, Op, Transaction } = require("sequelize");


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: config.db.dialect,
        operatorsAliases: 0,

        pool: {
            max: config.db.pool.max,
            min: config.db.pool.min,
            acquire: config.db.pool.acquire,
            idle: config.db.pool.idle
        }
    }
);


const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;
db.Transaction = Transaction;


db.parkinglot = require("./parkinglot.model.js")(sequelize, DataTypes);
db.parkinglevel = require("./parkinglevel.model")(sequelize, DataTypes);
db.spots = require("./parkingspot.model.js")(sequelize, DataTypes);
db.reservation = require("./reservation.model.js")(sequelize, DataTypes);

db.parkinglot.hasMany(db.parkinglevel, { foreignKey: 'parkinglotId' });
db.parkinglevel.hasMany(db.spots, { foreignKey: 'parkingId' })


module.exports = db;