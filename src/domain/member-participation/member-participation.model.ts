import { Document, Schema, model } from 'mongoose';

export interface IMemberParticipation {
  id: string;
  memberId: string;
  happeningId: string;
}
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
