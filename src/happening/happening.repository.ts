import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import HappeningModel, { IHappening } from './happening.model';
import { Happening } from './happening';
import { HappeningFactory } from './happening.factory';

@injectable()
export class HappeningRepository {
  constructor(private list: IHappening[] = [], private happeningFactory: HappeningFactory) {}

  public add({ id, name, description, isPublish, memberIds }: IHappening): Observable<IHappening> {
    return from(
      new HappeningModel({ id, name, description, isPublish, memberIds: memberIdList }).save(),
    );
  }

  public getByIndex(id: string): Observable<Happening> {
    return from(HappeningModel.findOne({ id: id }, null, { limit: 1 }).exec()).pipe(
      map(happening => this.happeningFactory.recreate(happening)),
    );
  }

  public update(id: string, option: IHappening): Observable<Happening> {
    return from(HappeningModel.findOneAndUpdate({ id }, option, { new: true }).exec()).pipe(
      map(happening => this.happeningFactory.recreate(happening)),
    );
  }
}
