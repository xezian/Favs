import express from 'express';
import cors from 'cors';
import axios from 'axios';
import db from './db';

const app = express();

app.use(cors({ credentials: true }))

/**
 * Submit a search by name query to the FDIC API and return results
 */
app.get('/banks/:search', (req, res) => {
    const baseUrl =  "https://banks.data.fdic.gov/api/institutions?fields=UNINUM,NAME,WEBADDR,ZIP,CITY,STNAME,ASSET,BKCLASS,ACTIVE,NAMEHCR,MDI_STATUS_CODE,MDI_STATUS_DESC,OFFICES&search=NAME:"
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
 * Just get the details of a bank you faved
 */
app.get('/bank/:bankId', async (req,res) => {
    // start by getting the bank name
    const bankId = req.params.bankId
    const client = db()
    await client.connect()
    const result = await client.query(`SELECT * FROM favs WHERE id = ${bankId}`)
    await client.end()
    res.send({data:result.rows})
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
 * Just get the id of a fav bank
 */
app.get('/fav/:name/:uninum', async (req,res) => {
    const client = db()
    await client.connect()
    const response = await client.query('SELECT id FROM favs WHERE "NAME" = $1 and "UNINUM" = $2', [req.params.name, req.params.uninum])
    await client.end()
    res.send({data:{id: response.rows[0].id}})
})

/**
 * Fav/Unfav a bank, by adding or removing it from the favs table
 */
app.post('/fav/', async (req,res) => {
    // save bank to db
    const client = db()
    await client.connect()
    let msg
    let id = -1
    const params = req.query
    const response = await client.query('SELECT * FROM favs WHERE "NAME" = $1 and "UNINUM" = $2', [params.NAME, params.UNINUM])
    if (response.rows.length === 0) {
        const insertResponse = await client.query(
            'INSERT into favs ("UNINUM","NAME","WEBADDR","ZIP","CITY","STNAME","ASSET","BKCLASS","ACTIVE","NAMEHCR","MDI_STATUS_CODE","MDI_STATUS_DESC","OFFICES") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id',
            [params.UNINUM,params.NAME,params.WEBADDR,params.ZIP,params.CITY,params.STNAME,params.ASSET,params.BKCLASS,params.ACTIVE,params.NAMEHCR,params.MDI_STATUS_CODE,params.MDI_STATUS_DESC,params.OFFICES]
        )
        msg = 'faved'
        id = insertResponse.rows[0].id
    } else {
        await client.query('DELETE FROM favs WHERE "NAME" = $1 and "UNINUM" = $2', [params.NAME, params.UNINUM])
        id = response.rows[0].id
        msg = 'unfaved'
    }
    await client.end()
    res.send({data:{id,msg}})
})

/**
 * Start API
 */
app.listen(1000, () => {
    console.log('The application is listening on port 1000!');
})
