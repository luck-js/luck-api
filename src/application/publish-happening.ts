import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';

@injectable()
export class PublishHappening {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  execute(id: string): Observable<void> {
    return this.relationMemberHappeningService.publishHappening(id);
  }
}
