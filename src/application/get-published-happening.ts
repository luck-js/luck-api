import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { MemberParticipation } from '../domain/member-participation/member-participation';
import { IPublishedHappeningView } from './model/published-happening-view.model';

@injectable()
export class GetPublishedHappening {
  constructor(private memberParticipationService: MemberParticipationService) {}

  async execute(id: string): Promise<IPublishedHappeningView> {
    const memberParticipations = await this.memberParticipationService.getListById(id)
    return mapToPublishedHappeningView(memberParticipations)
  }
}

function mapToPublishedHappeningView(
  memberParticipations: MemberParticipation[],
): IPublishedHappeningView {
  const { name, description } = memberParticipations[0].happening;
  const participants = memberParticipations
    .filter(memberParticipation => memberParticipation.getMember().eventMemberRole.abilityToRandom)
    .map(memberParticipation => ({
      name: memberParticipation.getMember().name,
      uniqueLink: memberParticipation.id,
    }));

  return {
    name,
    description,
    participants,
  };
}
