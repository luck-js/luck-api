import { HappeningRepository } from './happening.repository';
import { Happening, NewHappening } from './happening.interface';
import HappeningFactory from './happening.factory';
import MemberService from '../member/member.service';
import HappeningMapper from './happening.mapper';

class HappeningService {
  constructor(
    private memberService: MemberService,
    private happeningRepository: HappeningRepository,
  ) {}

  async findById(id: string): Promise<Happening | null> {
    const happeningRecord = await this.happeningRepository.findById(id);

    if (happeningRecord === null) {
      return null;
    }

    const members = await this.memberService.findByIds(happeningRecord.memberIds);

    return {
      members,
      id: happeningRecord.id,
      name: happeningRecord.name,
      description: happeningRecord.description,
      createdAt: happeningRecord.createdAt,
    };
  }

  async create(newHappening: NewHappening): Promise<Happening> {
    const members = await this.memberService.createList(newHappening.members);
    const happening = HappeningFactory.create({
      members,
      name: newHappening.name,
      description: newHappening.description,
    });
    const happeningRecord = HappeningMapper.toRecord(happening);

    await this.happeningRepository.add(happeningRecord);

    return happening;
  }
}

export default HappeningService;
