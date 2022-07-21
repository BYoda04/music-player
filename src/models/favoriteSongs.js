const { dbConnect, DataTypes } = require('../db/database');

//models
const { Songs } = require('./songs');
const { Users } = require('./users');

//Model table
const FavoriteSongs = dbConnect.define('favoriteSongs', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Songs,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
		defaultValue: true,
    }
});

module.exports = {
    FavoriteSongs
};