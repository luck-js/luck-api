import express, { Request, Response, Router } from 'express';
import DrawLinkController from './draw-link.controller';

class DrawLinkRouter {
  private readonly router: Router = express.Router();

  constructor(private drawLinkController: DrawLinkController) {}

  setup(): Router {
    this.router.route('/:id').get((req: Request, res: Response) => {
      this.drawLinkController.get(req, res);
    });

    return this.router;
  }
}

export default DrawLinkRouter;
