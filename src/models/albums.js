const { dbConnect, DataTypes } = require('../db/database');

//Model table
const Albums = dbConnect.define('albums', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    artistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'normal'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    }
});

module.exports = {
    Albums
};