import { Router } from 'express';
import HappeningRouter from './happening.router';
import HappeningController from './happening.controller';
import HappeningService from './happening.service';
import HappeningMongoRepository from './happening-mongo.repository';

class HappeningRouterFactory {
  static create(): Router {
    const happeningRepository = new HappeningMongoRepository();
    const happeningService = new HappeningService(happeningRepository);
    const happeningController = new HappeningController(happeningService);

    const happeningRouter = new HappeningRouter(happeningController);
    return happeningRouter.setup();
  }
}

export default HappeningRouterFactory;
