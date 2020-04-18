import { Schema } from 'mongoose';

export const NoteVersionSchema: Schema = new Schema({
  title: {
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
});
