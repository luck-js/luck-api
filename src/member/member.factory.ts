import { Member, NewMember } from './member.interface';
import UuidGenerationService from '../utils/uuid-generation.service';

class MemberFactory {
  static create(newMember: NewMember): Member {
    const id = newMember.id ?? UuidGenerationService.createNewUuid();
    return {
      id,
      name: newMember.name,
      matchedMemberId: newMember.matchedMemberId,
    };
  }
}

export default MemberFactory;
