import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMatchedMemberView } from './model/matched-member-view.model';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';

export class GetMatchedMember {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  public execute(id: string): Observable<IMatchedMemberView> {
    return this.relationMemberHappeningService.get(id).pipe(
      map(memberParticipation => ({
        me: mapToMemberView(memberParticipation.getMember()),
        matchedMember: mapToMemberView(memberParticipation.getMatchedMember()),
      })),
    );
  }
}

function mapToMemberView({ id, name }: Member): IMemberView {
  return { id, name };
}
