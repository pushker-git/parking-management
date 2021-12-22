module.exports = (sequelize, type) => {
    return sequelize.define("parkinglot",
        {
            id: {
                type: type.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: { 
                type : type.STRING,
                allowNull: false
            },
            address: type.STRING,
            level: type.INTEGER
        }
    );
};