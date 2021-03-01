import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import router from './routes';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
