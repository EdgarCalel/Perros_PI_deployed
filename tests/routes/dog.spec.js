/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { Dog, Temperament, conn } = require("../../src/db")

const agent = session(app)

describe("Dogs routes", () => {
 describe('/dogs', function() {
  it('GET responde con estado 200', function(){
    return agent
      .get('/dogs')
      .expect(function(res){
        expect(res.status).equal(200)})
  })})


});