import { injectable } from 'inversify';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { INewPublishedHappeningView } from './model/published-happening-view.model';
import { MemberParticipation } from '../domain/member-participation/member-participation';
import { IPublishedHappeningView } from './model/published-happening-view.model';

@injectable()
export class CreatePublishedHappening {
  constructor(private memberParticipationService: MemberParticipationService) {}

  async execute(
    id: string,
    { name, description, participants }: INewPublishedHappeningView,
  ): Promise<IPublishedHappeningView> {
    const metadata = { name, description };
    await this.memberParticipationService.addParticipantMembers(id, participants);
    await this.memberParticipationService.publishHappening(id);
    await this.memberParticipationService.updateHappeningMetadata(id, metadata);
    const memberParticipations = await this.memberParticipationService.getListById(id);
    return mapToPublishedHappeningView(memberParticipations);
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
