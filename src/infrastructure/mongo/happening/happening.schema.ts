import { Document, model, Schema } from 'mongoose';
import { IHappening } from '../../../domain/happening/happening.model';

export interface IHappeningSchema extends IHappening, Document {
  id: string;
}

const HappeningSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    isPublish: {
      type: Boolean,
      required: true,
    },
    memberIds: {
      type: [String],
      required: true,
    },
  },
  { collection: 'happening' },
);

export default model<IHappeningSchema>('Happening', HappeningSchema);
