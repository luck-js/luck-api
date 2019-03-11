import { Observable } from 'rxjs';
import { IMemberParticipation } from './member-participation.model';

export interface IMemberParticipationRepository {
  add(memberParticipation: IMemberParticipation): Observable<IMemberParticipation>;

  update(memberParticipation: IMemberParticipation): Observable<IMemberParticipation>;

  getByIndex(id: string): Observable<IMemberParticipation>;
}
