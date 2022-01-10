
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
    
    await client.query('CREATE TABLE IF NOT EXISTS favs (id SERIAL PRIMARY KEY, "NAME" VARCHAR(255) not null, "UNINUM" INT not null unique, "WEBADDR" VARCHAR(255), "ZIP" INT, "CITY" VARCHAR(255), "STNAME" VARCHAR(255), "ASSET" VARCHAR(255), "BKCLASS" VARCHAR(255), "ACTIVE" VARCHAR(255), "NAMEHCR" VARCHAR(255), "MDI_STATUS_CODE" VARCHAR(255), "MDI_STATUS_DESC" VARCHAR(255), "OFFICES" INT)')
    await client.query('CREATE TABLE IF NOT EXISTS comments (id SERIAL PRIMARY KEY, "NAME" VARCHAR(255) not null, "UNINUM" INT not null unique, COMMENT TEXT not null)')
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
