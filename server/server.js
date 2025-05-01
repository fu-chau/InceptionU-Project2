import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


const server = app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})