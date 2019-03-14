import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { MemberParticipation } from '../domain/member-participation/member-participation';
import { IPublishedHappeningView } from './model/published-happening-view.model';

@injectable()
export class GetPublishedHappening {
  constructor(private memberParticipationService: MemberParticipationService) {}

  execute(id: string): Observable<IPublishedHappeningView> {
    return this.memberParticipationService
      .getListByHappeningId(id)
      .pipe(map(memberParticipations => mapToPublishedHappeningView(memberParticipations)));
  }
}

function mapToPublishedHappeningView(
  memberParticipations: MemberParticipation[],
): IPublishedHappeningView {
  const { name, description } = memberParticipations[0].happening;
  const participants = memberParticipations.map(memberParticipation => ({
    name: memberParticipation.getMember().name,
    uniqueLink: memberParticipation.id,
  }));

  return {
    name,
    description,
    participants,
  };
}
