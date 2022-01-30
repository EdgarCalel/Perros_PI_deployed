const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Genre', {
      
      name: {
        type: DataTypes.STRING,
        
      },
  },
     {          // para no tener que agregar todos estos datos cuando mando un post
       timestamps: false,
       createdAt: false,
       updatedAt: false
   
   });
  };