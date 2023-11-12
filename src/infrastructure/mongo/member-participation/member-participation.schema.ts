import { Document, model, Schema } from 'mongoose';
import { IMemberParticipation } from '../../../domain/member-participation/member-participation.model';

export interface IMemberParticipationSchema extends IMemberParticipation, Document {
  id: string;
}

const MemberParticipationSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    happeningId: {
      type: String,
      required: true,
    },
  },
  { collection: 'memberParticipation' },
);

export default model<IMemberParticipationSchema>('MemberParticipation', MemberParticipationSchema);
