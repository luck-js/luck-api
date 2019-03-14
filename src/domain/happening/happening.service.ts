import { injectable } from 'inversify';
import { Happening } from './happening';
import { Observable } from 'rxjs';
import { HappeningFactory } from './happening.factory';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member';
import { IHappening } from './happening.model';
import { IHappeningRepository } from './happening.repository';

@injectable()
export class HappeningService {
  constructor(
    private memberService: MemberService,
    private happeningRepository: IHappeningRepository,
    private happeningFactory: HappeningFactory,
  ) {}

  add(happening: Happening): Observable<Happening> {
    return this.addMembers(happening.members).pipe(
      switchMap(() => this.happeningRepository.add(mapToEntity(happening))),
      mapTo(happening),
    );
  }

  update(happening: Happening): Observable<Happening> {
    return this.updateMembers(happening.members).pipe(
      switchMap(() => this.happeningRepository.update(mapToEntity(happening))),
      mapTo(happening),
    );
  }

  get(id: string): Observable<Happening> {
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
