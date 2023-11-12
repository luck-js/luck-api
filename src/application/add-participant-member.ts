import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';

@injectable()
export class AddParticipantMember {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  async execute(id: string, name: string): Promise<IMemberView> {
    const member = await this.relationMemberHappeningService.addParticipantMember(id, name);
    return mapToMemberView(member);
  }
}

function mapToMemberView({ id, name }: Member): IMemberView {
  return { id, name };
}
