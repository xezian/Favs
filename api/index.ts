import express from 'express';
import cors from 'cors';
import axios from 'axios';
import db from './db';

const app = express();

app.use(cors({ credentials: true }))

app.get('/banks/:search', (req, res) => {
    const baseUrl =  "https://banks.data.fdic.gov/api/institutions?fields=NAME&search=NAME:"
    const searchTerm = req.params.search
    const url = baseUrl + searchTerm
    axios.get(url)
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Get all the IDs from the favs table, query the API for the name of each ID, and return the results
 * 
 */
app.get('/favs/', async (req, res) => {
    // get saved banks from db
    const client = db()
    await client.connect()
    const result = await client.query('SELECT * FROM favs')
    await client.end()
    res.send({data: result.rows})
})

/**
 * Fav/Unfav a bank, by adding or removing it's ID from the favs table
 */
app.post('/fav/:name', async (req,res) => {
    // save bank to db
    const client = db()
    await client.connect()
    let msg
    const response = await client.query('SELECT * FROM favs WHERE name = $1', [req.params.name])
    if (response.rows.length === 0) {
        await client.query('INSERT into favs (name) VALUES ($1)', [req.params.name])
        msg = 'faved'
    } else {
        await client.query('DELETE FROM favs WHERE name = $1', [req.params.name])
        msg = 'unfaved'
    }
    await client.end()
    res.send(msg)
})

app.listen(1000, () => {
    console.log('The application is listening on port 1000!');
})
