import { Request, Response } from 'express';
import { NoteMongoRepository } from './note-mongo.repository';
import { INote, IUINote } from './note.schema';

export function getNotes(req: Request, res: Response): void {
  const { userId } = req.query;
  if (!userId) res.json([]);

  // @ts-ignore
  new NoteMongoRepository().getByIndex({ userId }).then(notes => {
    console.log('getNotes -> notesMap', JSON.stringify(notes));

    const data = { notes: transform(notes) };
    res.json(data);
  });
}

function transform(notes: INote[]): IUINote[] {
  return notes
    .reduce((previousValue: INote[], currentValue) => {
      const { _id: id, updatedAt, content, title, userId } = currentValue;
      return [...previousValue, { id, updatedAt, content, title, userId }];
    }, [])
    .reverse();
}
