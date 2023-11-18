import { MemberRepository } from './member.repository';
import { Member, NewMember } from './member.interface';
import MemberFactory from './member.factory';
import MemberMapper from './member.mapper';

class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async createList(newMembers: NewMember[]): Promise<Member[]> {
    const members = newMembers.map(MemberFactory.create);
    const records = members.map(MemberMapper.toRecord);

    await this.memberRepository.addList(records);

    return members;
  }
}

export default MemberService;
