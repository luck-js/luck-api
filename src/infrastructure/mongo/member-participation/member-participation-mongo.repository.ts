import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import MemberParticipationModel from './member-participation.schema';
import { IMemberParticipation } from '../../../domain/member-participation/member-participation.model';
import { IMemberParticipationRepository } from '../../../domain/member-participation/member-participation.repository';

@injectable()
export class MemberParticipationMongoRepository implements IMemberParticipationRepository {
  public add(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
    return from(new MemberParticipationModel(memberParticipation).save());
  }

  public update(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
    return from(
      MemberParticipationModel.findOneAndUpdate(
        { id: memberParticipation.id },
        memberParticipation,
        { new: true },
      ).exec(),
    );
  }

  public getByIndex(id: string): Observable<IMemberParticipation> {
    return from(MemberParticipationModel.findOne({ id }, null, { limit: 1 }).exec());
  }

  getByHappeningIndex(happeningId: string): Observable<IMemberParticipation[]> {
    return from(MemberParticipationModel.find({ happeningId }, null, {}).exec());
  }
}
