import { Happening } from './happening.interface';

export interface HappeningRepository {
  getAll(): Promise<Happening[]>;
}
