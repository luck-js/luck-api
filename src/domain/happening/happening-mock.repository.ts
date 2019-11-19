import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { IHappeningRepository } from './happening.repository';
import { IHappening } from './happening.model';

@injectable()
export class HappeningMockRepository implements IHappeningRepository {
  constructor(private list: IHappening[] = []) {}

  add(happening: IHappening): Observable<IHappening> {
    this.list.push(happening);
    return of(happening);
  }

  getByIndex(id: string): Observable<IHappening> {
    return of(this.list.find(happening => happening.id === id));
  }

  update(happening: IHappening): Observable<IHappening> {
    this.list = this.list.reduce((state, prevHappening) => {
      prevHappening =
        prevHappening.id !== happening.id ? prevHappening : { ...prevHappening, ...happening };
      state.push(prevHappening);
      return state;
    }, []);

    return of(happening);
  }
}
