import os from 'os';
import dotenv from 'dotenv';
import http from 'http';
import MongoDb, { MongoDbConfig } from '../database/mongo-db';
import Routes from './routes';
import Server, { ServerConfig } from './server';

dotenv.config();

const database = process.env.DATABASE_URL || '';
const clientURL = process.env.CLIENT_URL || '';
const port = process.env.PORT || '9000';
const serverHost = `http://${os.hostname()}`;

const mongoDbConfig: MongoDbConfig = {
  database,
};

const serverConfig: ServerConfig = {
  port,
  serverHost,
  clientURL,
};

class Application {
  constructor(private mongoDb: MongoDb, private routes: Routes, private server: Server) {}

  bootstrap(): http.Server {
    this.mongoDb.connect(mongoDbConfig);
    const server = this.server.start(serverConfig);
    this.routes.setup();
    return server;
  }
}

export default Application;
