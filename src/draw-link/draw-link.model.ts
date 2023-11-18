import { Document, model, Schema } from 'mongoose';
import { DrawLinkRecord } from './draw-link.interface';

interface DrawLinkDocument extends DrawLinkRecord, Document {
  id: string;
}

const DrawLinkSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    happeningId: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
  },
  { collection: 'draw-link' },
);

const DrawLinkModel = model<DrawLinkDocument>('DrawLink', DrawLinkSchema);

export default DrawLinkModel;
