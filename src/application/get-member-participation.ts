import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { IMemberParticipationView } from './model/member-participation-view.model';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';
import { Happening } from '../domain/happening/happening';
import { IHappeningView } from './model/happening-view.model';

@injectable()
export class GetMemberParticipation {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  async execute(id: string): Promise<IMemberParticipationView> {
    const memberParticipation = await this.relationMemberHappeningService.get(id);
    return {
      happening: mapToHappeningView(memberParticipation.happening),
      member: mapToMemberView(memberParticipation.member),
    };
  }
}

function mapToHappeningView({ id, name, isPublish, description }: Happening): IHappeningView {
  return { id, name, isPublish, description };
}

function mapToMemberView({ id, name }: Member): IMemberView {
  return { id, name };
}
