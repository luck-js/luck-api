import { Document, model, Schema } from 'mongoose';
import { Happening } from './happening.interface';

interface HappeningDocument extends Happening, Document {
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
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: 'happening' },
);

const HappeningModel = model<HappeningDocument>('Happening', HappeningSchema);

export default HappeningModel;
