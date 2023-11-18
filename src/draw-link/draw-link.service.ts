import { DrawLinkRepository } from './draw-link.repository';
import HappeningService from '../happening/happening.service';
import { DrawLink, NewDrawLink } from './draw-link.interface';
import DrawLinkFactory from './draw-link.factory';
import DrawLinkMapper from './draw-link.mapper';

class DrawLinkService {
  constructor(
    private happeningService: HappeningService,
    private drawLinkRepository: DrawLinkRepository,
  ) {}

  async getList(ids: string[]): Promise<DrawLink[]> {
    const drawLinkRecords = await this.drawLinkRepository.findByIds(ids);
    const happening = await this.happeningService.findById(drawLinkRecords[0].happeningId);

    if (happening === null) {
      return [];
    }

    return drawLinkRecords.map((drawLinkRecord) =>
      DrawLinkMapper.toEntity(happening, drawLinkRecord),
    );
  }

  async createList(newDrawLinks: NewDrawLink[]): Promise<DrawLink[]> {
    const drawLinks = newDrawLinks.map(DrawLinkFactory.create);
    const drawLinkRecords = drawLinks.map(DrawLinkMapper.toRecord);

    await this.drawLinkRepository.addList(drawLinkRecords);
    return drawLinks;
  }
}

export default DrawLinkService;
