import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { IMatchedMemberView } from './model/matched-member-view.model';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';

@injectable()
export class GetMatchedMember {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  async execute(id: string): Promise<IMatchedMemberView> {
    const memberParticipation = await this.relationMemberHappeningService.get(id);
    return {
      me: mapToMemberView(memberParticipation.getMember()),
      matchedMember: mapToMemberView(memberParticipation.getMatchedMember()),
    };
  }
}

function mapToMemberView({ id, name }: Member): IMemberView {
  return { id, name };
}
