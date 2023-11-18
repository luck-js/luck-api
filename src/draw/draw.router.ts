import express, { Request, Response, Router } from 'express';
import DrawController from './draw.controller';

class DrawRouter {
  private readonly router: Router = express.Router();

  constructor(private drawController: DrawController) {}

  setup(): Router {
    this.router.route('/').post((req: Request, res: Response) => {
      this.drawController.create(req, res);
    });
    this.router.route('/:id').get((req: Request, res: Response) => {
      this.drawController.get(req, res);
    });

    return this.router;
  }
}

export default DrawRouter;
