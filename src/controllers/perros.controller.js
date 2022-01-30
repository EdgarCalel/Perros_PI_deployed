const axios = require('axios');
const { Dog, Temperamento} = require('../db')

const perroPromesa =(req, res)=>{
   axios.get('https://api.thedogapi.com/v1/breeds')
   .then(respuestaapi => {respuestaapi.data.map(ed=>{
        return{
               id: ed.id,
               name: ed.name,
               height_min: parseInt(ed.height.metric.slice(0, 2).trim()) ?parseInt(ed.height.metric.slice(0, 2).trim()):0,
               height_max: parseInt(ed.height.metric.slice(4).trim())?parseInt(ed.height.metric.slice(4).trim()):0,
               weight_min: parseInt(ed.weight.metric.slice(0, 2).trim()) ?parseInt(ed.weight.metric.slice(0, 2).trim()):0,
               weight_max: parseInt(ed.weight.metric.slice(4).trim()) ?parseInt(ed.weight.metric.slice(4).trim()):0,
               life_span: ed.life_span,      
               image: ed.image.url ?ed.image.url: 'no tiene imagen',
               temperament: ed.temperament ? ed.temperament : 'se desconoce su temperemanto'
        }})
       })
       .then(response=>response)
  .then(response=>{res.status(200).json(response)})
   .catch(error => {
     res.status(404).json(error)
   })
}
const PerrobyApi = async (req, res)=>{
  try {
    const Urlapi = await axios('http://api.thedogapi.com/v1/breeds')
    const infoApi = await Urlapi.data.map(ed =>{
      return{
        id: ed.id,
        name: ed.name,
        height_min: parseInt(ed.height.metric.slice(0, 2).trim()) ?parseInt(ed.height.metric.slice(0, 2).trim()):0,
        height_max: parseInt(ed.height.metric.slice(4).trim())?parseInt(ed.height.metric.slice(4).trim()):0,
        weight_min: parseInt(ed.weight.metric.slice(0, 2).trim()) ?parseInt(ed.weight.metric.slice(0, 2).trim()):0,
        weight_max: parseInt(ed.weight.metric.slice(4).trim()) ?parseInt(ed.weight.metric.slice(4).trim()):0,
        life_span: ed.life_span,      
        image: ed.image.url ?ed.image.url: 'no tiene imagen',
        temperament: ed.temperament ? ed.temperament : 'se desconoce su temperemanto',
        // createdInDB: 0
        // weight: ed.weight.metric,
        // height: ed.height.metric,
        // height: ed.height.metric
      }})
    return  infoApi
  } catch (error) {
    console.log(error);
  }
};
const DogByName = async (req, res)=>{
  const { name } =req.params;  
const dogTotal = await JoinApiBd();
try {
  if (name) {
    
    // let dogName = await dogTotal.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()))
    let dogName =  dogTotal.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()))
   dogName.length ?
   res.json(dogName)  : 
   res.status(404).json('no hay info')
} }catch (error) {
  res.json({message: "se tuvo un problema en la conexion."});
}};

const infoBD = async (req, res)=>{
return await Dog.findAll({
    include:[{
      model: Temperamento,
      attributes:['name'],
                through:{ 
        attributes:[],
      },
    },]
  })
}
const JoinApiBd = async ()=>{
  const infoApi = await PerrobyApi();
  const infoBd = await infoBD();

 const infoBdMap= await infoBd.map((el)=>{
    return{
      createdInDB: el.createdInDB,
      id: el.id,
      name: el.name.charAt(0).toUpperCase()+el.name.slice(1).toLowerCase(),
      height_min: el.height_min,
      height_max: el.height_max,
      weight_min: el.weight_min,
      weight_max: el.weight_max,
      life_span: el.life_span,
      image: el.image?el.image:'https://s3-us-west-2.amazonaws.com/melingoimages/Images/27866.jpg',
      temperament: el.Temperamentos.map(el=>el.name).join()

    }
  })
  const infoTotal = [...infoApi, ...infoBdMap];
  
  return infoTotal
}     

const ByTemperament = async (req, res)=>{
  const temperament = req.query.temperament;
  const everyDog = await JoinApiBd();
  const dogSearchResult = everyDog.filter((dog) => {
      if (temperament === 'all') return everyDog
      else if (dog.temperament) {
          return (dog.temperament.toLowerCase()).includes(temperament?.toLowerCase())
      }
  });
  res.status(200).json( dogSearchResult)
}
const findAll = async (req, res)=>{
  try {
    let findDogs = await JoinApiBd();
  res.status(200).send(findDogs) 
  } catch (error) {
    res.status(404).json({message:'no se tiene'})
  }

}

const findId = async (req, res) => {
const { id } = req.params;

    const dogTotal = await JoinApiBd();
if (id) {
  let dogId = await dogTotal.filter(el => el.id == id)
  dogId.length?
    res.status(200).json(dogId):
    res.status(404).send('No se encontro el perro que buscaba')
}}
const CreateDog = async (req, res) =>{
  const { 
    name, 
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    image,
  temperament }= req.body;
  
  const dogNew = await Dog.create({
    name, 
    height_min, 
    height_max,
    weight_min, 
    weight_max,
    life_span,
  image })
  
  let temperamentoIn = await Temperamento.findAll({
    where: { name:temperament}
  })
  dogNew.addTemperamento(temperamentoIn);
res.send('Ha Creado con exito el perro')
}
const filterTemperament = async (req, res)=>{
  const { temperament } = req.query;
  const everyDog = await findAll();
  const dogSearchResult = everyDog.filter((dog) => {
      if (temperament === 'all') return everyDog
      else if (dog.temperament) {
          return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
      }
  });
  res.status(200).json(dogSearchResult)
  }

  const deletePerro = async (req, res)=>{
  const { namedelete } =req.params
    const result = await  Dog.findOne({
    where :{name : namedelete}
  })

 const Eliminar = await result
  Eliminar.destroy()
  res.status(200).json({message :'Se ha elimanado el perro con nombre: '+ Eliminar.name})
  }





module.exports = { PerrobyApi, infoBD, findAll, findId, CreateDog, DogByName, filterTemperament, deletePerro, 
                    ByTemperament,perroPromesa }