import { Observable } from 'rxjs';
import { IMember } from './member.model';

export interface IMemberRepository {
  add(members: IMember): Observable<IMember>;

  addList(members: IMember[]): Observable<IMember[]>;

  getByIndex(id: string): Observable<IMember>;

  updateList(members: IMember[]): Observable<IMember[]>;
}
