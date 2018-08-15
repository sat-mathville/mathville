const db = require('./server/db/')
const {Question, User, Ability}  = require('./server/db/models')

async function seed() {
    await db.sync({force: true})
    console.log('db synced')

    const questions = await Promise.all([
        Question.create({ content: '769 + 502 = ?', option1: '1,271',option2: '267',option3: '1,371',option4: '1,471'
        }),
        Question.create({content: '578,101 - 194,129 = ?',option1: '383,972',option2: '772,230', option3: '-383,972',option4: '-772,230'
        })
    ])

    console.log(`seeded ${questions.length} questions`)

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

    }),
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
    }),
])

    await abilities[0].setUsers(users[0])
    await abilities[1].setUsers(users[1])

    console.log(`seeded 1 user`)
    console.log(`seeded 1 ability`)
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
