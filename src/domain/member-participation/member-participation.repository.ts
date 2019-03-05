import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import MemberParticipationModel, { IMemberParticipation } from './member-participation.model';

@injectable()
export class MemberParticipationRepository {
  public add(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
    return from(new MemberParticipationModel(memberParticipation).save());
  }

  public getByIndex(id: string): Observable<IMemberParticipation> {
    return from(MemberParticipationModel.findOne({ id }, null, { limit: 1 }).exec());
  }
}
