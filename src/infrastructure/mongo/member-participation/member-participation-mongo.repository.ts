import { injectable } from 'inversify';
import MemberParticipationModel from './member-participation.schema';
import { IMemberParticipation } from '../../../domain/member-participation/member-participation.model';
import { IMemberParticipationRepository } from '../../../domain/member-participation/member-participation.repository';

@injectable()
export class MemberParticipationMongoRepository implements IMemberParticipationRepository {
  add(memberParticipation: IMemberParticipation): Promise<IMemberParticipation> {
    return new MemberParticipationModel(memberParticipation).save();
  }

  update(memberParticipation: IMemberParticipation): Promise<IMemberParticipation> {
    return MemberParticipationModel.findOneAndUpdate(
      { id: memberParticipation.id },
      memberParticipation,
      { upsert: true, new: true },
    ).exec();
  }

  getByIndex(id: string): Promise<IMemberParticipation> {
    return MemberParticipationModel.findOne({ id }, null, { limit: 1 }).exec();
  }

  getAllByHappeningIndex(happeningId: string): Promise<IMemberParticipation[]> {
    return MemberParticipationModel.find({ happeningId }, null, {}).exec();
  }
}
