import { HappeningMongoRepository } from '../../infrastructure/mongo/happening/happening-mongo.repository';
import { Happening } from './happening';
import { Observable } from 'rxjs';
import { HappeningFactory } from './happening.factory';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member';
import { IHappening } from './happening.model';

export class HappeningService {
  constructor(
    private memberService: MemberService,
    private happeningRepository: HappeningMongoRepository,
    private happeningFactory: HappeningFactory,
  ) {}

  public add(happening: Happening): Observable<Happening> {
    return this.addMembers(happening.members).pipe(
      switchMap(() => this.happeningRepository.add(mapToEntity(happening))),
      mapTo(happening),
      // map(happening => this.happeningFactory.recreate(happening)),
    );
  }

  public update(happening: Happening): Observable<Happening> {
    return this.updateMembers(happening.members).pipe(
      switchMap(() => this.happeningRepository.update(happening.id, mapToEntity(happening))),
      mapTo(happening),
      // map(happening => this.happeningFactory.recreate(happening)),
    );
  }

  public get(id: string): Observable<Happening> {
    const mapToHappening = ({ id, name, description, isPublish, memberIds }: IHappening) => {
      return this.memberService
        .getList(memberIds)
        .pipe(
          map(members => this.happeningFactory.recreate(id, name, description, isPublish, members)),
        );
    };

    return this.happeningRepository
      .getByIndex(id)
      .pipe(switchMap(happening => mapToHappening(happening)));
  }

  private addMembers(members: Member[]): Observable<Member[]> {
    return this.memberService.addList(members);
  }

  private updateMembers(members: Member[]): Observable<Member[]> {
    return this.memberService.updateList(members);
  }
}

function mapToEntity({ id, description, isPublish, members, name }: Happening): IHappening {
  const memberIds = members.map(member => member.id);
  return { id, description, isPublish, memberIds, name };
}
