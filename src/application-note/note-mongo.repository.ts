import NoteModel, { INote, IUINote } from './note.schema';

export class NoteMongoRepository {
  addNote(note: IUINote): Promise<INote> {
    return new NoteModel(note).save();
  }

  updateNote(id: string, note: IUINote): Promise<INote> {
    const noteModel = NoteModel.findOne({ _id: id }, null, { limit: 1 });

    return noteModel.exec().then(n => {
      return NoteModel.update(
        { _id: id },
        {
          $set: {
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt,
          },
          $push: { versions: { title: n.title, content: n.content, createdAt: n.updatedAt } },
        },
        {
          upsert: true,
          new: true,
        },
      )
        .exec()
        .then(() => NoteModel.findOne({ _id: id }, null, { limit: 1 }));
    });
  }

  getByIndex(note: { userId: string }): Promise<INote[]> {
    return (
      NoteModel.find(note, null)
        .exec()
        // @ts-ignore
        .then(doc => {
          if (doc && doc.length !== 0) {
            return doc;
          } else {
            const content = '';
            const title = '';
            const createdAt = Date.now();
            const updatedAt = Date.now();
            return new NoteModel({
              userId: note.userId,
              content,
              title,
              createdAt,
              updatedAt,
            })
              .save()
              .then(() => NoteModel.find(note, null));
          }
        })
    );
  }
}
