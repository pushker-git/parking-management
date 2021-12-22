module.exports = (sequelize, type) => {
    return sequelize.define("reservation",
        {
            id: {
                type: type.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            spotId: {
                type: type.BIGINT,
                references: {
                    model: 'parkingspots',
                    key: 'id'
                }
            },
            vehicleId: {
                type: type.STRING,
                allowNull: false
            },
            entryDateTime: {
                type: type.DATE,
                allowNull: false
            },
            exitDateTime: type.DATE,
            fee: type.INTEGER
        },
        {
            indexes: [
                {
                    fields: ['vehicleId']
                }
            ]

        }
    );
};