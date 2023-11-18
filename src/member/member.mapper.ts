import { Member, MemberRecord } from './member.interface';

class MemberMapper {
  static toRecord(member: Member): MemberRecord {
    return member;
  }
}

export default MemberMapper;
