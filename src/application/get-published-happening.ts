import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { MemberParticipation } from '../domain/member-participation/member-participation';
import { IPublishedHappeningView } from './model/published-happening-view.model';

export class GetPublishedHappening {
  constructor(private memberParticipationService: MemberParticipationService) {}

  public execute(id: string): Observable<IPublishedHappeningView> {
    return this.memberParticipationService
      .get(id)
      .pipe(map(memberParticipation => mapToPublishedHappeningView(memberParticipation)));
  }
}

function mapToPublishedHappeningView(
  memberParticipation: MemberParticipation,
): IPublishedHappeningView {
  const { name, description } = memberParticipation.happening;
  const participants = memberParticipation.getParticipants().map(participant => ({
    name: participant.name,
    // TODO: get unique link from Member -> MemberParticipation relation
    uniqueLink: null,
  }));

  return {
    name,
    description,
    participants,
  };
}
