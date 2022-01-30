const axios = require('axios')
const { Dog, Temperamento } = require('../db');
const { JoinApiBd } = require('./perros.controller')


const platfomrs = async (req, res) => {
    try {
        const Urlapi = await axios('https://api.rawg.io/api/games?key=586a7bfffee24a149ed022502c667554')
        const infoApi = await Urlapi.data.results.map(el=>{
            return{
                name: el.name,
                ratings: el.ratings.map(el=>el.percent),
                platforms: el.platforms
            }
        })

      res.json( infoApi)
      } catch (error) {
        console.log(error);
      }
}

function callRecipeApi(req, res, next) {
  try {
    const ho = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0384748908a84a209a541c316d236fe7&includeNutrition=true`);
const info = ho.data.results;
    res.json(info);

  } catch (error) {
    next(error);
  }
}
module.exports = {platfomrs,callRecipeApi }
