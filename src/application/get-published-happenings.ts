import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { MemberParticipation } from '../domain/member-participation/member-participation';

interface IParticipantsView {
  name: string;
}

interface IPublishedHappeningView {
  id: string;
  name: string;
  description: string;
  participants: IParticipantsView[];
}

@injectable()
export class GetPublishedHappenings {
  constructor(private memberParticipationService: MemberParticipationService) {}

  execute(): Observable<IPublishedHappeningView[]> {
    return this.memberParticipationService
      .getOrganiserParticipations()
      .pipe(
        map(organiserParticipations => organiserParticipations.map(mapToPublishedHappeningView)),
      );
  }
}

function mapToPublishedHappeningView(
  organiserParticipation: MemberParticipation,
): IPublishedHappeningView {
  const { name, description } = organiserParticipation.happening;
  const participants = organiserParticipation
    .getMembers()
    .filter(member => member.eventMemberRole.abilityToRandom)
    .map(member => ({
      name: member.name,
    }));

  return {
    id: organiserParticipation.id,
    name,
    description,
    participants,
  };
}
