import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { IMemberParticipationRepository } from './member-participation.repository';
import { IMemberParticipation } from './member-participation.model';

@injectable()
export class MemberParticipationMockRepository implements IMemberParticipationRepository {
  constructor(private list: IMemberParticipation[] = []) {}

  add(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
    this.list.push(memberParticipation);
    return of(memberParticipation);
  }

  getByIndex(id: string): Observable<IMemberParticipation> {
    return of(this.list.find(memberParticipation => memberParticipation.id === id));
  }

  update(memberParticipation: IMemberParticipation): Observable<IMemberParticipation> {
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

  getByHappeningIndex(happeningId: string): Observable<IMemberParticipation[]> {
    return of(
      this.list.filter(memberParticipation => memberParticipation.happeningId === happeningId),
    );
  }
}
