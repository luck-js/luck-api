import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';

export class PublishHappening {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  public execute(id: string): Observable<void> {
    return this.relationMemberHappeningService.publishHappening(id);
  }
}
