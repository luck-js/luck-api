import { IMemberParticipation } from './member-participation.model';

export interface IMemberParticipationRepository {
  add(memberParticipation: IMemberParticipation): Promise<IMemberParticipation>;

  update(memberParticipation: IMemberParticipation): Promise<IMemberParticipation>;

  getByIndex(id: string): Promise<IMemberParticipation>;

  getAllByHappeningIndex(id: string): Promise<IMemberParticipation[]>;
}
