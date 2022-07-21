//models

const { Albums } = require("../models/albums");
const { Artists } = require("../models/artists");
const { Songs } = require("../models/songs");
const { Users } = require("../models/users");


const relations = ()=>{

    //hasMany
        //artists
        Artists.hasMany(Albums,{ foreignKey:'artistId' });
        //albums
        Albums.hasMany(Songs,{ foreignKey:'albumId' });

    //hasOne
        //users
        Users.hasOne(Artists,{ foreignKey:'userId' });

    //belongsTo
        //albums
        Albums.belongsTo(Artists);
        //songs
        Songs.belongsTo(Albums);
        //artists
        Artists.belongsTo(Users);

    //belongsToMany
        //users
        Users.belongsToMany(Songs,{
            foreignKey:'userId',
            through:'favoriteSongs'
        });
        //songs
        Songs.belongsToMany(Users,{
            foreignKey:'songId',
            through:'favoriteSongs'
        });
    
};

module.exports = { relations };