import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

export interface ServerConfig {
  port: string;
  serverHost: string;
  clientURL: string;
}

class Server {
  constructor(private app: Application) {}

  start(config: ServerConfig): http.Server {
    this.app.set('port', config.port);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({ origin: config.clientURL }));

    return this.app.listen(config.port, () => {
      console.log(`API running on ${config.serverHost}:${config.port}`);
    });
  }
}

export default Server;
