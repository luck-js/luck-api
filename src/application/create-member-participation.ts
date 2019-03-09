import { Observable } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { Happening } from '../domain/happening/happening';
import { IHappeningView } from './model/happening-view.model';
import { Member } from '../domain/member/member';
import { IMemberView } from './model/member-view.model';
import { IMemberParticipationView } from './model/member-participation-view.model';

export class CreateMemberParticipation {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  public execute(): Observable<IMemberParticipationView> {
    return this.relationMemberHappeningService.create().pipe(
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
