import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';

@injectable()
export class CreateMemberParticipation {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  execute(): Observable<string> {
    return this.relationMemberHappeningService
      .create()
      .pipe(map(memberParticipation => memberParticipation.id));
  }
}
