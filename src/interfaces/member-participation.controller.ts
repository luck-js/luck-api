import { Request, Response } from 'express';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GetMemberParticipation } from '../application/get-member-participation';
import { GetMatchedMember } from '../application/matched-member';
import { CreateMemberParticipation } from '../application/create-member-participation';
import { UpdateHappeningMetadata } from '../application/update-happening-metadata';
import { AddParticipantMember } from '../application/add-participant-member';
import { PublishHappening } from '../application/publish-happening';

export class MemberParticipationController {
  constructor(
    private createMemberParticipationApplication: CreateMemberParticipation,
    private getMemberParticipationApplication: GetMemberParticipation,
    private getMatchedMemberApplication: GetMatchedMember,
    private updateHappeningMetadataApplication: UpdateHappeningMetadata,
    private addParticipantMemberApplication: AddParticipantMember,
    private publishHappeningApplication: PublishHappening,
  ) {}

  public createMemberParticipation(req: Request, res: Response) {
    this.createMemberParticipationApplication
      .execute()
      .pipe(
        take(1),
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
        take(1),
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
        take(1),
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

  public addParticipantMember(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    this.addParticipantMemberApplication
      .execute(id, name)
      .pipe(
        take(1),
        map(participant => res.json(participant)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public publishHappening(req: Request, res: Response) {
    const { id } = req.params;
    this.publishHappeningApplication
      .execute(id)
      .pipe(
        take(1),
        map(() => res.sendStatus(200)),
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
