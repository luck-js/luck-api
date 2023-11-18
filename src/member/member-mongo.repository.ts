import { MemberRepository } from './member.repository';
import { MemberRecord } from './member.interface';
import MemberModel from './member.model';

class MemberMongoRepository implements MemberRepository {
  addList(members: MemberRecord[]): Promise<MemberRecord[]> {
    return MemberModel.insertMany(members);
  }
}

export default MemberMongoRepository;
