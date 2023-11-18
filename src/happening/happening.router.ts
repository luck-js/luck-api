import express, { Request, Response, Router } from 'express';
import HappeningController from './happening.controller';

class HappeningRouter {
  private readonly router: Router = express.Router();

  constructor(private happeningController: HappeningController) {}

  setup(): Router {
    this.router.route('/').get((req: Request, res: Response) => {
      this.happeningController.getAll(req, res);
    });

    return this.router;
  }
}

export default HappeningRouter;
