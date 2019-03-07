import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMemberParticipationView } from './model/member-participation-view.model';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';
import { Happening } from '../domain/happening/happening';
import { IHappeningView } from './model/happening-view.model';

export class GetMemberParticipation {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  public execute(id: string): Observable<IMemberParticipationView> {
    return this.relationMemberHappeningService.get(id).pipe(
      take(1),
      map(memberParticipation => ({
        happening: mapToHappeningView(memberParticipation.happening),
        member: mapToMemberView(memberParticipation.member),
      })),
    );
  }
}

function mapToHappeningView({ id, name, isPublish, description }: Happening): IHappeningView {
  return { id, name, isPublish, description };
}

function mapToMemberView({ id, name }: Member): IMemberView {
  return { id, name };
}
