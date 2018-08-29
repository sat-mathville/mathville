//check get /api/questions
'use strict'

const {expect} = require('chai')
const request = require('supertest')

const app = require('../index')
const agent = request.agent(app)

const db = require('../db')
const {Question} = require('../db/models')

// describe('Questions Route', () => {
//   before(() => {
//     return db.sync({force:true})
//   })

//   afterEach(() => {
//     return Question.truncate({cascade: true})
//   })

//   describe('GET /api/questions', () => {
//     it('returns all questions in the DB', () => {
//       let question1 = Question.build({
//         content: '1 + 1?',
//         option1: '1',
//         option2: '2',
//         option3: '3',
//         option4: '4'
//       })

//       let question2 = Question.build({
//         content: '2 - 2?',
//         option1: '0',
//         option2: '1',
//         option3: '2',
//         option4: '3'
//       })

//       return question1.save()
//         .then(() => question2.save())
//         .then(() => {
//           return agent
//             .get('/api/questions')
//             .expect(200)
//             .expect((res) => {
//               expect(res.body).to.be.an.instanceOf(Array)
//               expect(res.body[0].content).to.equal('1 + 1?')
//               expect(res.body[1].content).to.equal('2 - 2?')
//             })
//         })
//     })
//   })
// })
