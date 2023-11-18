import { Request, Response } from 'express';
import MigrateService from './migrate.service';

class MigrateController {
  constructor(private migrateService: MigrateService) {}

  async migrateHappenings(req: Request, res: Response) {
    try {
      await this.migrateService.migrateHappenings(req.body);
      res.status(200);
      res.send();
    } catch (error: unknown) {
      console.log(error);
      const message = error as unknown as string;
      res.status(400);
      res.send({ message });
    }
  }

  async migrateMembers(req: Request, res: Response) {
    try {
      await this.migrateService.migrateMembers(req.body);
      res.status(200);
      res.send();
    } catch (error: unknown) {
      console.log(error);
      const message = error as unknown as string;
      res.status(400);
      res.send({ message });
    }
  }
  async migrateMemberParticipation(req: Request, res: Response) {
    try {
      await this.migrateService.migrateMemberParticipation(req.body);
      res.status(200);
      res.send();
    } catch (error: unknown) {
      console.log(error);
      const message = error as unknown as string;
      res.status(400);
      res.send({ message });
    }
  }
}

export default MigrateController;
