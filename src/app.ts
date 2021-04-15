import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import routes from './routes/index.route';

dotenv.config();
const app = express();
const env = process.env;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

routes(app);

mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then( () => {
    console.log(`DB connect to ${env.PROTOCOL}${env.DB_HOST}:${env.DB_PORT}`);
    app.listen(env.PORT, () => {
        console.log(`Server connect to ${env.PROTOCOL}${env.HOST}:${env.PORT}`);
    });
});
