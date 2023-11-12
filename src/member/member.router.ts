import express, { Request, Response, Router } from 'express';
import MemberController from './member.controller';

class MemberRouter {
  private readonly router: Router = express.Router();

  constructor(private memberController: MemberController) {}

  setup(): Router {
    this.router.route('/').get((req: Request, res: Response) => {
      this.memberController.getAll(req, res);
    });

    return this.router;
  }
}

export default MemberRouter;
