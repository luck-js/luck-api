import { INote } from './note.schema';

export interface INoteRepository {
  add(note: INote): Promise<INote>;

  getByIndex(id: string): Promise<INote>;

  getAll(): Promise<INote[]>;

  update(note: INote): Promise<INote>;
}
