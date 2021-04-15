import { Express } from 'express';
import Guild from './guild.route';

export default (app: Express): void => {
    app.use('/guild', Guild);
};
