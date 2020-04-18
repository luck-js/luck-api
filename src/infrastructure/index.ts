import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import api from './routes/api';
import noteApi from '../application-note/api';
import config from './config/main';

export class Server {
  app: express.Application;

  static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.configure();
    this.middleware();
    this.api();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  configure() {
    mongoose
      .connect(config.database, { useNewUrlParser: true })
      .then(resolve => console.log(`MongoDB is connected on ${config.database}`))
      .catch(reject => console.log('connection error'));

    this.app.set('port', config.port);
    this.app.listen(config.port, _ =>
      console.log(`API running on ${config.serverHost}:${config.port}`),
    );
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    this.app.use('/api/v1', api);
    this.app.use('/api/v2', noteApi);

    this.app.get('*', (req, res) => {
      res.json({ message: 'Welcome to Luck REST Api' });
    });
  }

  /**
   * Add express middleware
   *
   * @class Server
   * @method api
   */
  public middleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

Server.bootstrap();
