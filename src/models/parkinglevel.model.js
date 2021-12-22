module.exports = (sequelize, type) => {
    return sequelize.define("parkinglevel",
        {
            id: {
                type: type.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            parkinglotId: {
                type: type.BIGINT,
                references: {
                    model: 'parkinglots',
                    key: 'id'
                },
                allowNull: false
            },
            level: {
                type: type.BIGINT,
                allowNull: false
            },
            capacity: { 
                type: type.INTEGER, 
                allowNull: false 
            }
        }
    );
};