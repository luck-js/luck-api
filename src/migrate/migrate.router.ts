import express, { Request, Response, Router } from 'express';
import MigrateController from './migrate.controller';

class DrawRouter {
  private readonly router: Router = express.Router();

  constructor(private drawController: MigrateController) {}

  setup(): Router {
    this.router.route('/happenings').post((req: Request, res: Response) => {
      this.drawController.migrateHappenings(req, res);
    });
    this.router.route('/members').post((req: Request, res: Response) => {
      this.drawController.migrateMembers(req, res);
    });
    this.router.route('/member-participations').post((req: Request, res: Response) => {
      this.drawController.migrateMemberParticipation(req, res);
    });

    return this.router;
  }
}

export default DrawRouter;
