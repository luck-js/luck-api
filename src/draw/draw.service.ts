import { DrawRepository } from './draw.repository';
import { Draw, NewDrawView } from './draw.interface';
import HappeningService from '../happening/happening.service';
import DrawLinkService from '../draw-link/draw-link.service';
import MatchingMemberService from '../utils/matching-member.service';
import MemberFactory from '../member/member.factory';
import DrawFactory from './draw.factory';
import DrawLinkMapper from './draw.mapper';

class DrawService {
  constructor(
    private happeningService: HappeningService,
    private drawLinkService: DrawLinkService,
    private drawRepository: DrawRepository,
  ) {}

  async findById(id: string): Promise<Draw | null> {
    const drawRecord = await this.drawRepository.findById(id);

    if (drawRecord === null) {
      return null;
    }

    const drawLinks = await this.drawLinkService.getList(drawRecord.drawLinkIds);

    return {
      id,
      drawLinks,
    };
  }

  async create(newDraw: NewDrawView): Promise<Draw> {
    const members = newDraw.members.map(MemberFactory.create);
    const matchedMembers = MatchingMemberService.matchMembers(members);
    const happening = await this.happeningService.create({ ...newDraw, members: matchedMembers });
    const newDrawLinks = happening.members.map((member) => ({ happening, member }));
    const drawLinks = await this.drawLinkService.createList(newDrawLinks);
    const draw = DrawFactory.create({ drawLinks });
    const drawRecord = DrawLinkMapper.toRecord(draw);
    await this.drawRepository.add(drawRecord);

    return draw;
  }
}

export default DrawService;
