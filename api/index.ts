import express from 'express';
import cors from 'cors';
import axios from 'axios';

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
app.get('/banks/favs/', (req, res) => {
    res.send("Favs");
})

app.listen(1000, () => {
    console.log('The application is listening on port 1000!');
})
