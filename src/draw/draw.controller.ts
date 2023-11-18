import { Request, Response } from 'express';
import DrawService from './draw.service';
import { DrawView } from './draw.interface';
import DrawPresenter from './draw.presenter';

interface ApplicationError {
  message: string;
}

class DrawController {
  constructor(private drawService: DrawService) {}

  async get(req: Request, res: Response<DrawView | ApplicationError>) {
    try {
      const { id } = req.params;
      const draw = await this.drawService.findById(id);

      if (draw === null) {
        res.status(400);
        res.send({ message: 'draw not found' });
      } else {
        const drawView = DrawPresenter.mapToDrawView(draw);
        res.json(drawView);
      }
    } catch (error: unknown) {
      const message = error as unknown as string;
      res.status(400);
      res.send({ message });
    }
  }

  async create(req: Request, res: Response<DrawView | ApplicationError>) {
    try {
      const { name, description, members } = req.body;
      const draw = await this.drawService.create({ name, description, members });
      const drawView = DrawPresenter.mapToDrawView(draw);
      res.json(drawView);
    } catch (error: unknown) {
      const message = error as unknown as string;
      res.status(400);
      res.send({ message });
    }
  }
}

export default DrawController;
