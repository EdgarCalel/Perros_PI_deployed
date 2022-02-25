require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//nst {
  //_USER, DB_PASSWORD, DB_HOST,DB_NAME,
  //TABASE_URL, DB_DB
//= process.env;

const sequelize = new Sequelize('postgres://xpgjbsvwnmlzdu:65da00fa2630daf8ef53b71db0d2426e8bae72e9df8422da4665c060e11cf2e9@ec2-18-233-114-179.compute-1.amazonaws.com:5432/d4qkfov361vuk1
'{
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  port:5432,
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperamento,Videogame, Genre,Recipe, db } = sequelize.models;

Dog.belongsToMany(Temperamento, {through: "dog-temperamento"});
Temperamento.belongsToMany(Dog, {through: "dog-temperamento"});

Videogame.belongsToMany(Genre, {through: "Videogame-Genre"});
Genre.belongsToMany(Videogame, {through: "Videogame-Genre"});


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
