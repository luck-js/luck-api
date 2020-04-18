import { Request, Response } from 'express';
import { NoteMongoRepository } from './note-mongo.repository';

export function addNotes(req: Request, res: Response): void {
  console.log('addNotes');
  const { content, title, userId } = req.body;
  const createdAt = Date.now();
  const updatedAt = Date.now();

  new NoteMongoRepository().addNote({ createdAt, updatedAt, userId, content, title }).then(note => {
    console.log('addNotes: ', note);
    const { _id: id, updatedAt, content, title, userId } = note;
    res.json({ id, updatedAt, content, title, userId });
  });
}
