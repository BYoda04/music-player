const { dbConnect, DataTypes } = require('../db/database');

//Model table
const Songs = dbConnect.define('songs', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    }
});

module.exports = {
    Songs
};