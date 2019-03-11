import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { IMemberParticipationRepository } from './member-participation.repository';
import { IMemberParticipation } from './member-participation.model';

@injectable()
export class MemberParticipationMockRepository implements IMemberParticipationRepository {
  constructor(private list: IMemberParticipation[] = []) {}

  public add(happening: IMemberParticipation): Observable<IMemberParticipation> {
    this.list.push(happening);
    return of(happening);
  }

  public getByIndex(id: string): Observable<IMemberParticipation> {
    return of(this.list.find(happening => happening.id === id));
  }

  public update(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
    this.list = this.list.reduce((state, prevMemberParticipation) => {
      prevMemberParticipation =
        prevMemberParticipation.id !== memberParticipation.id
          ? prevMemberParticipation
          : { ...prevMemberParticipation, ...memberParticipation };
      state.push(prevMemberParticipation);
      return state;
    }, []);

    return of(memberParticipation);
  }
}
