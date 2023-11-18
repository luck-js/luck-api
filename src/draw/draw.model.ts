import { Document, model, Schema } from 'mongoose';
import { DrawRecord } from './draw.interface';

interface DrawDocument extends DrawRecord, Document {
  id: string;
}

const DrawSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    drawLinkIds: {
      type: [String],
      required: true,
    },
  },
  { collection: 'draw' },
);

const DrawModel = model<DrawDocument>('Draw', DrawSchema);

export default DrawModel;
