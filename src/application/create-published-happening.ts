import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map, switchMap } from 'rxjs/operators';
import { INewPublishedHappeningView } from './model/published-happening-view.model';
import { MemberParticipation } from '../domain/member-participation/member-participation';
import { IPublishedHappeningView } from './model/published-happening-view.model';

@injectable()
export class CreatePublishedHappening {
  constructor(private memberParticipationService: MemberParticipationService) {}

  execute(
    id: string,
    { name, description, participants }: INewPublishedHappeningView,
  ): Observable<IPublishedHappeningView> {
    const metadata = { name, description };
    return this.memberParticipationService.addParticipantMembers(id, participants).pipe(
      switchMap(() => this.memberParticipationService.publishHappening(id)),
      switchMap(() => this.memberParticipationService.updateHappeningMetadata(id, metadata)),
      switchMap(() => this.memberParticipationService.getListById(id)),
      map(memberParticipations => mapToPublishedHappeningView(memberParticipations)),
    );
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
