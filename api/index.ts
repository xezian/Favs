import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ credentials: true }))

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(1000, () => {
    console.log('The application is listening on port 1000!');
})
