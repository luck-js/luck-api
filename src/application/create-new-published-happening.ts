import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { INewPublishedHappeningView } from './model/published-happening-view.model';
import { IPublishedHappeningView } from './model/published-happening-view.model';
import { CreatePublishedHappening } from './create-published-happening';
import { CreateMemberParticipation } from './create-member-participation';

@injectable()
export class CreateNewPublishedHappening {
  constructor(
    private createPublishedHappening: CreatePublishedHappening,
    private createMemberParticipation: CreateMemberParticipation,
  ) {}

  execute(
    newPublishedHappeningView: INewPublishedHappeningView,
  ): Observable<IPublishedHappeningView> {
    return this.createMemberParticipation
      .execute()
      .pipe(
        switchMap(id =>
          this.createPublishedHappening
            .execute(id, newPublishedHappeningView)
            .pipe(map(publishedHappeningView => ({ id, ...publishedHappeningView }))),
        ),
      );
  }
}
