import { Request, Response } from 'express';
import HappeningService from './happening.service';

class HappeningController {
  constructor(private happeningService: HappeningService) {}

  async getAll(req: Request, res: Response) {
    try {
      const happenings = await this.happeningService.getAll();
      res.json(happenings);
    } catch (error) {
      res.status(400);
      res.send(error);
    }
  }
}

export default HappeningController;
