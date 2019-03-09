import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map, switchMap } from 'rxjs/operators';
import { INewHappeningView } from './model/new-happening-view.model';
import { MemberParticipation } from '../domain/member-participation/member-participation';
import { IPublishedHappeningView } from './model/published-happening-view.model';

export class CreatePublishedHappening {
  constructor(private memberParticipationService: MemberParticipationService) {}

  public execute(
    id: string,
    { name, description, participants }: INewHappeningView,
  ): Observable<IPublishedHappeningView> {
    const metadata = { name, description };
    return this.memberParticipationService.addParticipantMembers(id, participants).pipe(
      switchMap(() => this.memberParticipationService.publishHappening(id)),
      switchMap(() => this.memberParticipationService.updateHappeningMetadata(id, metadata)),
      switchMap(() => this.memberParticipationService.get(id)),
      map(memberParticipation => mapToPublishedHappeningView(memberParticipation)),
    );
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
