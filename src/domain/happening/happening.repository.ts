import { Observable } from 'rxjs';
import { IHappening } from './happening.model';

export interface IHappeningRepository {
  add(happening: IHappening): Observable<IHappening>;

  getByIndex(id: string): Observable<IHappening>;

  update(id: string, happening: IHappening): Observable<IHappening>;
}
