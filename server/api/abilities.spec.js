'use strict'

const {expect} = require('chai')
const request = require('supertest')

const app = require('../index')
const agent = request.agent(app)

const db = require('../db')
const {Ability, User} = require('../db/models')

// describe('Abilities Route:', () => {
//   before(() => {
//     return db.sync({force:true})
//   })

//   afterEach(() => {
//     return Ability.truncate({ cascade: true })
//   })

//   describe('GET /api/abilities', () => {
//     it('returns all abilities in the DB', () => {
//       let ability1 = Ability.build({
//         name: 'fire power',
//         type: 'magic',
//         image: 'potion'
//       })

//       let ability2 = Ability.build({
//         name: 'water power',
//         type: 'magic',
//         image: 'potion'
//       })

//       return ability1.save()
//         .then(() => {return ability2.save()})
//         .then(() => {
//           console.log('agent!',agent.app._events)
//           return agent
//             .get('/api/abilities')
//             .expect(200)
//             .expect((res) => {
//               expect(res.body).to.be.an.instanceOf(Array)
//               expect(res.body[0].name).to.equal('fire power')
//               expect(res.body[1].name).to.equal('water power')
//             })
//         })
//     })
//   })

  // describe('PUT /api/abilities/:id', () => {
  //   let ability1
  //   let cody

  //   beforeEach(() => {
  //     return Ability.create({
  //       name: 'water power',
  //       type: 'magic',
  //       image: 'potion'
  //     })
  //       .then((createdAbility) => {
  //         ability1 = createdAbility
  //         console.log("1. ability in before each", ability1.name)
  //       })
  //       .then(() => {
  //         return User.create({
  //           email: 'cody@email.com',
  //           username: 'admin',
  //           password: 'admintesting',
  //           character: 1
  //         })
  //       })
  //       .then((createdUser) => {
  //         cody = createdUser
  //         console.log("What is cody",createdUser)
  //       })
  //       .then(() => {
  //         ability1.setUsers(cody)
  //       })
  //   })

  //   it('updates the ability', () => {
  //     console.log("before put",ability1.id)
  //     return agent
  //       .put('/api/abilities/' + ability1.id)
  //       .send({
  //         name: 'wind power'
  //       })
  //       .then(() => {
  //         console.log("**********************" + ability1.id)
  //         return Ability.findById(ability1.id)})
  //       .then((foundAbility) => {
  //         expect(foundAbility).to.exist
  //         expect(foundAbility.name).to.equal('wind power')
  //       })
  //   })
  // })
// })
