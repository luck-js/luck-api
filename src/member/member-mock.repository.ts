import { MemberRepository } from './member.repository';
import { Member } from './member.interface';
import MEMBER_LIST_MOCK from './member-mock';

class MemberMockRepository implements MemberRepository {
  private list: Member[] = MEMBER_LIST_MOCK;

  async getAll(): Promise<Member[]> {
    return this.list;
  }
}

export default MemberMockRepository;
