import { MemberRepository } from './member.repository';
import { MemberRecord } from './member.interface';
import MemberModel from './member.model';

class MemberMongoRepository implements MemberRepository {
  findByIds(ids: string[]): Promise<MemberRecord[]> {
    try {
      return MemberModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      console.error('Error while fetching the list of members:', error);
      return Promise.resolve([]);
    }
  }

  addList(members: MemberRecord[]): Promise<MemberRecord[]> {
    return MemberModel.insertMany(members);
  }
}

export default MemberMongoRepository;
