require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//nst {
  //_USER, DB_PASSWORD, DB_HOST,DB_NAME,
  //TABASE_URL, DB_DB
//= process.env;

const sequelize = new Sequelize('postgres://tmbhvdmobxbjbn:ebb263d96b8b77acba5bbf8e22f53b3fb939afc935b08a2f9a017156063694bd@ec2-18-215-8-186.compute-1.amazonaws.com:5432/d603onm76ufjv3
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
