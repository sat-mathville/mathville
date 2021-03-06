const db = require('../server/db')
const {Question, User, Ability} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced')

  // QUESTIONS DATA

  const basicArithmetic = await Promise.all([
    Question.create({ content: '769 + 502 = ?', option1: '1,271', option2: '267', option3: '1,371', option4: '1,471'
    }),
    Question.create({content: '578,101 - 194,129 = ?', option1: '383,972', option2: '772,230', option3: '-383,972', option4: '-772,230'
    }),
    Question.create({content: '16 x 15 = ?', option1: '240', option2: '224', option3: '180', option4: '242'
    }),
    Question.create({content: '-96 ÷ 3 = ?', option1: '-32', option2: '32', option3: '-30', option4: '30'
    }),
    Question.create({content: '-171.6 ÷ -22 = ?', option1: '7.8', option2: '-9.7', option3: '9.7', option4: '-7.8'
    })
  ])

  const advancedArithmetic = await Promise.all([
    Question.create({content: 'What is the least common multiple (l.c.m.) of 18 and 24?', option1: '72', option2: '36', option3: '54', option4: '96'}),
    Question.create({content: 'What is the least common multiple (l.c.m.) of 16 and 48?', option1: '48', option2: '96', option3: '64', option4: '16'}),
    Question.create({content: 'What is the greatest common factor (g.c.f.) of 24 and 16?', option1: '8', option2: '16', option3: '24', option4: '6'}),
    Question.create({content: 'What is the greatest common factor (g.c.f.) of 11 and 44?', option1: '11', option2: '44', option3: '4', option4: '1'}),
    Question.create({content: 'What is the greatest common factor (g.c.f.) of 24 and 20?', option1: '4', option2: '6', option3: '2', option4: '20'})
  ])

  const basicProbability = await Promise.all([
    Question.create({content: 'If you flip a fair coin twice, what is the probability of getting at least 1 head?', option1: '0.75', option2: '0.5', option3: '1.25', option4: '-0.5'}),
    Question.create({content: 'If you roll a fair die once, what is the probability of getting an odd number?', option1: '0.5', option2: '-0.5', option3: '1.5', option4: '0.25'}),
    Question.create({content: 'If you roll a pair of fair dice once, what is the probability of getting a sum of 5?', option1: '1/9', option2: '1/4', option3: '-1/4', option4: '5/4'}),
    Question.create({content: 'If you roll a fair die twice, what is the probability of getting the same number twice?', option1: '1/6', option2: '-1/6', option3: '1/12', option4: '7/6'}),
    Question.create({content: 'If you roll a fair die twice, what is the probability of getting 2 different numbers?', option1: '5/6', option2: '1/6', option3: '-5/6', option4: '7/6'})
  ])

  const basicGeometry = await Promise.all([
    Question.create({content: 'Suppose you have a scoop of ice cream that is a perfect sphere and the scoop has a radius of r inches. What is the volume?', option1: '4/3πr³', option2: '3/4πr³', option3: '4/3πr²', option4: '3/4πr²' }),
    Question.create({content: 'Suppose you have a cyclindrical cup to put your ice cream. How can you determine the volume of your ice cream cup? (r = radius, h = height)', option1: 'πr²h', option2: '2πr²h', option3: '3πr²h', option4: '-3πr²' }),
    Question.create({content: 'Suppose you buy a scone that is triangular in shape. It has a height of 4 inches and a base of 3 inches. What is the area?', option1: '6 inches²', option2: '4 inches²', option3: '-8 inches²', option4: '12 inches²' }),
    Question.create({content: 'Suppose the floor area of the bakery has a width of 20 feet and a length of 15 feet. How large is the floor area?', option1: '300 feet²', option2: '-300 feet²', option3: '400 feet²', option4: '1500 feet²' }),
    Question.create({content: 'Suppose you buy a cookie from the bakery. How do you determine its circumference? (r = radius, d = diameter)', option1: 'πd', option2: 'πr²', option3: '2π', option4: '2πd' })
  ])

  // USERS DATA
  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      username: 'admin',
      password: 'admintesting',
      character: 1

    }),
    User.create({
      email: 'shoshana@email.com',
      username: 'Shoshana',
      password: '123',
      character: 2

    })
  ])

  // ABILITIES DATA
  const abilities = new Array(8)
  abilities[0] = await Ability.create({
    name: 'Magic Potion',
    type: 'magic',
    image: 'potion',
    value: 5
  })
  abilities[1] = await Ability.create({
    name: 'Strawberry',
    type: 'healing',
    image: 'strawberry',
    value: 8
  })
  abilities[2] = await Ability.create({
    name: 'Bread',
    type: 'strength',
    image: 'bread',
    value: 3
  })
  abilities[3] = await Ability.create({
    name: 'sword',
    type: 'weaponry',
    image: 'sword',
    value: 4
  })
  abilities[4] = await Ability.create({
    name: 'fish',
    type: 'strength',
    image: 'fish',
    value: 5
  })
  abilities[5] = await Ability.create({
    name: 'shield',
    type: 'weaponry',
    image: 'shield',
    value: 4
  })
  abilities[6] = await Ability.create({
    name: 'egg',
    type: 'healing',
    image: 'egg',
    value: 2
  })
  abilities[7] = await Ability.create({
    name: 'splash',
    type: 'trash',
    image: 'splash',
    value: 0
  })

  // SETTING ASSOCIATIONS
  for (let i = 0; i < basicArithmetic.length; i++) {
    await Promise.all([
      basicArithmetic[i].setAbility(abilities[0]),
      advancedArithmetic[i].setAbility(abilities[1]),
      basicGeometry[i].setAbility(abilities[2]),
      basicProbability[i].setAbility(abilities[3])
    ])
  }

  for (let i = 0; i < abilities.length; i++) {
    await abilities[i].setUsers(users[0])
  }
  await abilities[1].setUsers(users[1])

  console.log(`seeded ${basicArithmetic.length} basic arithmetic questions`)
  console.log(`seeded ${advancedArithmetic.length} advanced arithmetic
questions`)
  console.log(`seeded ${basicGeometry.length} basic geometry questions`)
  console.log(`seeded ${basicProbability.length} basic probability questions`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${abilities.length} abilities`)
}
async function runSeed () {
  console.log('...seeding')
  try {
    await seed()
  } catch (err) {
    console.log(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
