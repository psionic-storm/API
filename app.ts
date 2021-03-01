import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('hello'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
