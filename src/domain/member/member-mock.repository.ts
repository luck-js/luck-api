import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { IMember } from './member.model';
import { IMemberRepository } from './member.repository';

@injectable()
export class MemberMockRepository implements IMemberRepository {
  constructor(private list: IMember[] = []) {}

  public add(member: IMember): Observable<IMember> {
    this.list.push(member);
    return of(member);
  }

  public addList(members: IMember[]): Observable<IMember[]> {
    members.forEach(member => this.list.push(member));
    return of(this.list);
  }

  public getByIndex(id: string): Observable<IMember> {
    return of(this.list.find(member => member.id === id));
  }

  public updateList(members: IMember[]): Observable<IMember[]> {
    members.forEach(el => this.update(el));
    return of(this.list);
  }

  private update(member: IMember): void {
    if (!this.list.some(prevMember => Number(prevMember.id) === Number(member.id))) {
      this.list.push(member);
      return;
    }

    this.list = this.list.reduce((state, prevMember) => {
      prevMember = prevMember.id !== member.id ? prevMember : { ...prevMember, ...member };
      state.push(prevMember);
      return state;
    }, []);
  }
}
