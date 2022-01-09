
const { Client } = require('pg')


const setupTables = async () => {
    const client = new Client({
        user: 'myuser',
        host: 'localhost',
        database: 'mydb',
        password: 'myuserpassword',
    })
    await client.connect()

    // await client.query('DROP TABLE IF EXISTS favs')
    // await client.query(`DROP TABLE IF EXISTS comments`)
    
    await client.query('CREATE TABLE IF NOT EXISTS favs (id SERIAL PRIMARY KEY, name VARCHAR(255) not null unique)')
    await client.query('CREATE TABLE IF NOT EXISTS comments (id SERIAL PRIMARY KEY, name INT not null, comment TEXT not null)')
    await client.end()
}

setupTables();

const db = () => {
    const client = new Client({
        user: 'myuser',
        host: 'localhost',
        database: 'mydb',
        password: 'myuserpassword',
    })
    return client;
}

export default db
