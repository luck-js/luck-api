import { Request, Response } from 'express';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GetMemberParticipation } from '../application/get-member-participation';
import { GetMatchedMember } from '../application/matched-member';
import { CreateMemberParticipation } from '../application/create-member-participation';
import { UpdateHappeningMetadata } from '../application/update-happening-metadata';

export class MemberParticipationController {
  constructor(
    private createMemberParticipationApplication: CreateMemberParticipation,
    private getMemberParticipationApplication: GetMemberParticipation,
    private getMatchedMemberApplication: GetMatchedMember,
    private updateHappeningMetadataApplication: UpdateHappeningMetadata,
  ) {}

  public createMemberParticipation(req: Request, res: Response) {
    this.createMemberParticipationApplication
      .execute()
      .pipe(
        map(memberParticipation => res.json(memberParticipation)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public getMemberParticipation(req: Request, res: Response) {
    const { id } = req.params;
    this.getMemberParticipationApplication
      .execute(id)
      .pipe(
        map(memberParticipation => res.json(memberParticipation)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public getMatchedMember(req: Request, res: Response) {
    const { id } = req.params;
    this.getMatchedMemberApplication
      .execute(id)
      .pipe(
        map(matchedMember => res.json(matchedMember)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public editHappeningMetadata(req: Request, res: Response) {
    const { id } = req.params;
    const option = req.body;
    this.updateHappeningMetadataApplication
      .execute(id, option)
      .pipe(
        take(1),
        map(happening => res.json(happening)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  private sendError(res: Response, code: number, text: string): Observable<null> {
    res.status(code);
    res.send(text);
    return of();
  }
}
