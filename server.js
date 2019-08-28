import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/dotenv';
import index from './routes/index';
import category from './routes/category';
import post from './routes/post';
import user from './routes/user';
import comment from './routes/comment';
import auth from './routes/auth';
import defaultErrorHandler from './middlewares/defaultErrorHandler';
import authMiddleware from "./middlewares/authMiddleware";
const logger = require('./utils/logger')('server');

const app = express();

mongoose.Promise = global.Promise; // Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
mongoose.connection.on('error', () => {
    logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has been connected.'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(`/api/v${process.env.API_VERSION}/category`, category);
app.use(`/api/v${process.env.API_VERSION}/post`, post);
app.use(`/api/v${process.env.API_VERSION}/user`, authMiddleware, user);
app.use(`/api/v${process.env.API_VERSION}/comment`, comment);
app.use(`/api/v${process.env.API_VERSION}/auth`, auth);
app.use(`/api/v${process.env.API_VERSION}`, index);

app.use('/uploads', express.static('uploads'));
app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

app.listen(port, host, () => {
    logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
