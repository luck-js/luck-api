import { MemberRepository } from './member.repository';
import { Member } from './member.interface';

class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async getAll(): Promise<Member[]> {
    const members = await this.memberRepository.getAll();
    return members.map(({ id, name }) => ({ id, name }));
  }
}

export default MemberService;
