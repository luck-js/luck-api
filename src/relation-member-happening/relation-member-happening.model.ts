import { Document, Schema, model } from 'mongoose';

export interface IRelationMemberHappening {
  id: string;
  memberId: string;
  happeningId: string;
}
export interface IRelationMemberHappeningSchema extends IRelationMemberHappening, Document {
  id: string;
}

const RelationMemberHappeningSchema: Schema = new Schema(
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
  { collection: 'relationMemberHappening' },
);

export default model<IRelationMemberHappeningSchema>(
  'RelationMemberHappening',
  RelationMemberHappeningSchema,
);
