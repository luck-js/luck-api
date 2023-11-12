import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GetMemberParticipation } from '../application/get-member-participation';
import { GetMatchedMember } from '../application/get-matched-member';
import { CreateMemberParticipation } from '../application/create-member-participation';
import { UpdateHappeningMetadata } from '../application/update-happening-metadata';
import { AddParticipantMember } from '../application/add-participant-member';
import { PublishHappening } from '../application/publish-happening';
import { CreatePublishedHappening } from '../application/create-published-happening';
import { CreateNewPublishedHappening } from '../application/create-new-published-happening';
import { GetHappenings } from '../application/get-happenings';
import { GetPublishedHappening } from '../application/get-published-happening';

@injectable()
export class MemberParticipationController {
  constructor(
    private createMemberParticipationApplication: CreateMemberParticipation,
    private getMemberParticipationApplication: GetMemberParticipation,
    private getMatchedMemberApplication: GetMatchedMember,
    private updateHappeningMetadataApplication: UpdateHappeningMetadata,
    private addParticipantMemberApplication: AddParticipantMember,
    private publishHappeningApplication: PublishHappening,
    private createPublishedHappeningApplication: CreatePublishedHappening,
    private createNewPublishedHappeningApplication: CreateNewPublishedHappening,
    private getHappeningsApplication: GetHappenings,
    private getPublishedHappeningApplication: GetPublishedHappening,
  ) {}

  async createMemberParticipation(req: Request, res: Response) {
    try {
      const memberParticipation = await this.createMemberParticipationApplication.execute();
      res.json(memberParticipation);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async getMemberParticipation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const memberParticipation = await this.getMemberParticipationApplication.execute(id);
      res.json(memberParticipation);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async getMatchedMember(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const matchedMember = await this.getMatchedMemberApplication.execute(id);
      res.json(matchedMember);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async editHappeningMetadata(req: Request, res: Response) {
    const { id } = req.params;
    const option = req.body;

    try {
      const happening = await this.updateHappeningMetadataApplication.execute(id, option);
      res.json(happening);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async addParticipantMember(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const participant = await this.addParticipantMemberApplication.execute(id, name);
      res.json(participant);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async publishHappening(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const memberParticipation = await this.publishHappeningApplication.execute(id);
      res.json(memberParticipation);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async createPublishedHappening(req: Request, res: Response) {
    const { happening } = req.body;
    const { id } = req.params;
    try {
      const publishedHappeningView = await this.createPublishedHappeningApplication.execute(
        id,
        happening,
      );
      res.json(publishedHappeningView);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  getHappenings(req: Request, res: Response) {
    this.getHappeningsApplication
      .execute()
      .pipe(
        take(1),
        map(happenings => res.json(happenings)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  async createNewPublishedHappening(req: Request, res: Response) {
    const { happening } = req.body;
    try {
      const publishedHappeningView = await this.createNewPublishedHappeningApplication.execute(
        happening,
      );
      res.json(publishedHappeningView);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  async getPublishedHappening(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const publishedHappening = await this.getPublishedHappeningApplication.execute(id);
      res.json(publishedHappening);
    } catch (error) {
      this.sendError(res, 400, error);
    }
  }

  private sendError(res: Response, code: number, text: string): Observable<null> {
    res.status(code);
    res.send(text);
    return of();
  }
}
