import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import router from 'Routes/';
import { errorHandler } from 'Middlewares/error-handler';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
