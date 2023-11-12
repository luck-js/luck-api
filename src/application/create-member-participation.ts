import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';

@injectable()
export class CreateMemberParticipation {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  async execute(id?: string): Promise<string> {
    const memberParticipation = await this.relationMemberHappeningService.create(id)
    return memberParticipation.id
  }
}
