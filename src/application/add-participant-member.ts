import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';

@injectable()
export class AddParticipantMember {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  public execute(id: string, name: string): Observable<IMemberView> {
    return this.relationMemberHappeningService
      .addParticipantMember(id, name)
      .pipe(map(member => mapToMemberView(member)));
  }
}

function mapToMemberView({ id, name }: Member): IMemberView {
  return { id, name };
}
