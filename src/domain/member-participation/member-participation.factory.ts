import { injectable } from 'inversify';
import { MemberParticipation } from './member-participation';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';

@injectable()
export class MemberParticipationFactory {
  constructor(private uuidGenerationService: UuidGenerationService) {}

  public create(member: Member, happening: Happening): MemberParticipation {
    const id = this.uuidGenerationService.createNewUuid();

    return new MemberParticipation(id, member, happening);
  }

  public recreate(id: string, member: Member, happening: Happening): MemberParticipation {
    return new MemberParticipation(id, member, happening);
  }
}
