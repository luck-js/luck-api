import { Request, Response } from 'express';
import DrawLinkService from './draw-link.service';
import { DrawLinkView } from './draw-link.interface';
import DrawLinkPresenter from './draw-link.presenter';

interface ApplicationError {
  message: string;
}

class DrawLinkController {
  constructor(private drawLinkService: DrawLinkService) {}

  async get(req: Request, res: Response<DrawLinkView | ApplicationError>) {
    try {
      const { id } = req.params;
      const drawLink = await this.drawLinkService.findById(id);

      if (drawLink === null) {
        res.status(400);
        res.send({ message: 'drawLink not found' });
      } else {
        const drawView = DrawLinkPresenter.mapToDrawLinkView(drawLink);
        res.json(drawView);
      }
    } catch (error: unknown) {
      const message = error as unknown as string;
      res.status(400);
      res.send({ message });
    }
  }
}

export default DrawLinkController;
