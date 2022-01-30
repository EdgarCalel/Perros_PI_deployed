const { Dog, conn, Temperamento } = require('../../src/db.js');
const { expect } = require('chai');




describe('Temperamento model', ()=>{
it('El tipo de dato tiene que ser un string', ()=>{
  expect(typeof Temperamento.name).equal('string')
})
// it('el tipo de dato es un UUID',()=>{
//   const id2 ='UUID'
//   const id =Dog.createdInDB ="boolean";
//   const saludo =(typeof createdInDB)
//   console.log(saludo)
//   expect(id2).equal('UUID')
// })
})
