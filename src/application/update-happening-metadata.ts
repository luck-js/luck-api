import { injectable } from 'inversify';
import { Observable, throwError } from 'rxjs';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { map } from 'rxjs/operators';
import { Happening } from '../domain/happening/happening';
import { IHappeningView } from './model/happening-view.model';
import { IHappeningMetadata } from '../domain/happening/happening.model';

@injectable()
export class UpdateHappeningMetadata {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  execute(id: string, happeningMetadata: IHappeningMetadata): Observable<IHappeningView> {
    if (
      typeof happeningMetadata.name === 'undefined' ||
      typeof happeningMetadata.description === 'undefined'
    ) {
      return throwError(new Error('happeningMetadata is not complete'));
    }
    return this.relationMemberHappeningService
      .updateHappeningMetadata(id, happeningMetadata)
      .pipe(map(memberParticipation => mapToHappeningView(memberParticipation.happening)));
  }
}

function mapToHappeningView({ id, name, isPublish, description }: Happening): IHappeningView {
  return { id, name, isPublish, description };
}
