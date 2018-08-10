const db = require('./server/db/')
const {Question}  = require('./server/db/models')

async function seed() {
    await db.sync({force: true})
    console.log('db synced')

    const questions = await Promise.all([
        Question.create({content: 'Favorite flavor or icecream?', option1: 'chocolate', option2: 'vanilla', option3: 'mango', option4: 'red beans'}),
        Question.create({content: 'Do you like semicolons?', option1: 'YESSS!!!', option2: 'hell no', option3: 'uh, why should I care?', option4: 'what is a semicolon?'}),
        Question.create({content: 'Favorite pet?', option1: 'dog', option2: 'cat', option3: 'lizard', option4: 'snake'}),
        Question.create({content: 'Who is that wizard?', option1: 'Miracle Max', option2: 'Merlin', option3: 'Gandalf', option4: 'Dumbledore'})
    ])

    console.log(`seeded ${questions.length} questions`)
}

async function runSeed() {
    console.log('...seeding')
    try {
        await seed()
    } catch(err){
        console.log(err)
        process.exitCode = 1
    } finally {
        console.log('closing db connection')
        await db.close()
        console.log('db connection closed')
    } 
}

if(module === require.main){
    runSeed()
}

module.exports = seed