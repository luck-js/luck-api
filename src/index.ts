import express from 'express';
import MongoDb from './core/database/mongo-db';
import Routes from './core/webserver/routes';
import Application from './core/webserver/application';
import Server from './core/webserver/server';

const expressApp = express();

export const mongoDb = new MongoDb();
const routes = new Routes(expressApp);
const server = new Server(expressApp);

const application = new Application(mongoDb, routes, server);

const applicationServer = application.bootstrap();

/**
 * for integration tests
 */
export default applicationServer;
