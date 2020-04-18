import { Document, model, Schema } from 'mongoose';
import { NoteVersionSchema } from './note-version.schema';

export interface INoteVersion {
  _id: any;
  title: string;
  content: string;
  createdAt?: number;
}

export interface IUINote {
  id?: string;
  userId?: string;
  title: string;
  content: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface INote {
  _id: any;
  userId: string;
  title: string;
  content: string;
  createdAt?: number;
  updatedAt?: number;
  versions?: INoteVersion[];
}

export interface INoteSchema extends INote, Document {
  _id: any;
  userId: string;
  title: string;
  content: string;
  createdAt?: number;
  updatedAt?: number;
  versions?: INoteVersion[];
}

export const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: true,
    },
    versions: [NoteVersionSchema],
  },
  { collection: 'note' },
);

export default model<INoteSchema>('Note', NoteSchema);
