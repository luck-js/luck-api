import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import MemberParticipationModel, { IMemberParticipation } from './member-participation.model';
import { MemberParticipation } from './member-participation';
import { MemberParticipationFactory } from './member-participation.factory';

@injectable()
export class MemberParticipationRepository {
  constructor(
    private list: IMemberParticipation[] = [],
    private memberParticipationFactory: MemberParticipationFactory,
  ) {}

  public add(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
    return from(new MemberParticipationModel(memberParticipation).save());
  }

  public getByIndex(id: string): Observable<MemberParticipation> {
    return from(MemberParticipationModel.findOne({ id }, null, { limit: 1 }).exec()).pipe(
      map(memberParticipation => this.memberParticipationFactory.recreate(memberParticipation)),
    );
  }
}
