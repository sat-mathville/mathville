const db = require('./server/db/')
const {Category, Question, User, Ability} = require('./server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced')

  const basicArithmetic = await Promise.all([
    Question.create({ content: '769 + 502 = ?', option1: '1,271', option2: '267', option3: '1,371', option4: '1,471'
    }),
    Question.create({content: '578,101 - 194,129 = ?', option1: '383,972', option2: '772,230', option3: '-383,972', option4: '-772,230'
    }),
    Question.create({content: '16 * 15 = ?', option1: '240', option2: '224', option3: '180', option4: '242'
    }),
    Question.create({content: '-96 / 3 = ?', option1: '-32', option2: '32', option3: '-30', option4: '30'
    }),
    Question.create({content: '-171.6 / -22 = ?', option1: '7.8', option2: '-9.7', option3: '9.7', option4: '-7.8'
    })
  ])

  const advancedArithmetic = await Promise.all([
    Question.create({content: 'What is the least common multiple (l.c.m.) of 18 and 24.', option1: '72', option2: '36', option3: '54', option4: '96'}),
    Question.create({content: 'What is the least common multiple (l.c.m.) of 16 and 48.', option1: '48', option2: '96', option3: '64', option4: '16'}),
    Question.create({content: 'What is the greatest common factor (g.c.f.) of 24 and 16.', option1: '8', option2: '16', option3: '24', option4: '6'}),
    Question.create({content: 'What is the greatest common factor (g.c.f.) of 11 and 44.', option1: '11', option2: '44', option3: '4', option4: '1'}),
    Question.create({content: 'What is the greatest common factor (g.c.f.) of 24 and 20.', option1: '4', option2: '6', option3: '2', option4: '20'})
  ])

  const basicProbability = await Promise.all([
    Question.create({content: 'If you flip a fair coin 10 times, what is the probability of getting all heads?', option1: '0.5^10', option2: '1^10', option3: '0.25^10', option4: '-1^10'}),
    Question.create({content: 'If you flip a fair coin twice, what is the probability of getting at least 1 head?', option1: '0.75', option2: '0.5', option3: '1.25', option4: '-0.5'}),
    Question.create({content: 'If you will flip a fair die once, what is the probability of getting an odd number?', option1: '0.5', option2: '-0.5', option3: '1.5', option4: '0.25'}),
    Question.create({content: 'If you roll a pair of fair dice once, what is the probability of getting a sum of 5?', option1: '1/9', option2: '1/4', option3: '-1/4', option4: '5/4'}),
    Question.create({content: 'If you roll a fair die twice, what is the probability of getting the same number twice?', option1: '1/6', option2: '-1/6', option3: '1/12', option4: '7/6'}),
    Question.create({content: 'If you roll a fair die twice, what is the probability of getting 2 different numbers?', option1: '5/6', option2: '1/6', option3: '-5/6', option4: '7/6'})
  ])

  const basicGeometry = await Promise.all([
    Question.create({content: 'Suppose you have a scoop of ice cream that is a perfect sphere and the scoop has a radius of 3 inches. What is the volume?', option1: '4/3πr^3', option2: '3/4πr^3', option3: '4/3πr^2', option4: '3/4πr^2' }),
    Question.create({content: 'Suppose you have a cone to put your ice cream in. How can you determine the surface area for your cone?', option1: '2πr', option2: '3πr', option3: '2πr^2', option4: '-3πr^2' }),
    Question.create({content: 'What is the area of the roof of the bakery? It has a height of 8 feet and a base of 20 feet? What is the area?', option1: '80 feet', option2: '40 feet^2', option3: '-80 feet^2', option4: '100 feet^2' }),
    Question.create({content: 'Suppose the bakery has a width of 20 feet and a length of 15 feet. What is the area of the bakery?', option1: '300 feet^2', option2: '-300 feet^2', option3: '400 feet^2', option4: '1500 feet^2' }),
    Question.create({content: 'Suppose you buy a cookie from the bakery. How do you determine its circumference?', option1: 'πd', option2: 'πr^2', option3: '2π', option4: '2πd' })
  ])

  const categories = await Promise.all([
    Category.create({type: 'basicArithmetic'}),
    Category.create({type: 'advancedArithmetic'}),
    Category.create({type: 'basicGeometry'}),
    Category.create({type: 'basicProbability'})
  ])
  console.log(`seeded ${basicArithmetic.length} basic arithmetic questions`)
  console.log(`seeded ${advancedArithmetic.length} advanced arithmetic
  questions`)
  console.log(`seeded ${basicGeometry.length} basic geometry questions`)
  console.log(`seeded ${basicProbability.length} basic probability questions`)
  console.log(`seeded ${categories.length} categories`)
  for (let i = 0; i < basicArithmetic.length; i++) {
      await Promise.all([
        basicArithmetic[i].setCategory(categories[0]),
        advancedArithmetic[i].setCategory(categories[1]),
        basicGeometry[i].setCategory(categories[2]),
        basicProbability[i].setCategory(categories[3])
      ])
  }
  await basicProbability[5].setCategory(categories[3])

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

  const abilities = await Promise.all([
    Ability.create({
      name: 'Fire spell',
      type: 'magic',
      image: 'https://i.ytimg.com/vi/Iu8vGpCxJUs/maxresdefault.jpg',
      value: 5
    }),
    Ability.create({
      name: 'Avada Kedavra spell',
      type: 'magic',
      image: 'https://i.ytimg.com/vi/Iu8vGpCxJUs/maxresdefault.jpg',
      value: 8
    })
  ])

  await abilities[0].setUsers(users[0])
  await abilities[1].setUsers(users[1])

  await abilities[0].setCategory(categories[0])
  await abilities[1].setCategory(categories[1])

  console.log(`seeded 1 user`)
  console.log(`seeded 1 ability`)
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
