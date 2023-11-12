import { MemberRepository } from './member.repository';
import { Member } from './member.interface';

class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  getAll(): Promise<Member[]> {
    return this.memberRepository.getAll();
  }
}

export default MemberService;
