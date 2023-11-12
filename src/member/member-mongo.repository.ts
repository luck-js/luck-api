import { MemberRepository } from './member.repository';
import { Member } from './member.interface';
import MemberModel from './member.model';

class MemberMongoRepository implements MemberRepository {
  getAll(): Promise<Member[]> {
    return MemberModel.find().exec();
  }
}

export default MemberMongoRepository;
