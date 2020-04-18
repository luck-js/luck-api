import { Request, Response } from 'express';
import { NoteMongoRepository } from './note-mongo.repository';

export function updateNotes(req: Request, res: Response): void {
  console.log('updateNotes');
  const { content, title } = req.body;
  const updatedAt = Date.now();
  const { id } = req.params;

  new NoteMongoRepository().updateNote(id, { content, title, updatedAt }).then(note => {
    console.log('updateNotes -> note', note);
    const { _id: id, updatedAt, content, title } = note;
    res.json({ id, updatedAt, content, title });
  });
}
