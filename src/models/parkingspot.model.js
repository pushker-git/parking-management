const spotStatusEnum = require('../constaint/spotStatusEnum');
module.exports = (sequelize, type) => {
    return sequelize.define("parkingspot",
        {
            id: {
                type: type.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            parkingId: {
                type: type.BIGINT,
                references: {
                    model: 'parkinglevels',
                    key: 'id'
                }
            },
            label: {
                type: type.STRING,
                allowNull: false
            },
            status: type.ENUM(spotStatusEnum.Available, spotStatusEnum.Booked, spotStatusEnum.Maintiance)
        },
        {
            indexes: [
                // Create a unique index on email
                {
                  fields: ['status']
                }
            ]
            
        }
    );

};