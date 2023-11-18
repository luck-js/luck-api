import { Document, model, Schema } from 'mongoose';
import { HappeningRecord } from './happening.interface';

interface HappeningDocument extends HappeningRecord, Document {
  id: string;
}

const HappeningSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    memberIds: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: 'happening' },
);

const HappeningModel = model<HappeningDocument>('Happening', HappeningSchema);

export default HappeningModel;
