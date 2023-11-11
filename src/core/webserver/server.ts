import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export interface ServerConfig {
  port: string;
  serverHost: string;
  clientURL: string;
}

class Server {
  constructor(private app: Application) {}

  start(config: ServerConfig) {
    this.app.set('port', config.port);
    this.app.listen(config.port, () => {
      console.log(`API running on ${config.serverHost}:${config.port}`);
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({ origin: config.clientURL }));
  }
}

export default Server;
