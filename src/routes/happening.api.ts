import { Request, Response } from 'express';
import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';

export class HappeningApi {
    constructor(private relationMemberHappeningService: RelationMemberHappeningService) {
    }

    public create(req: Request, res: Response) {
        try {
            const relationId = this.relationMemberHappeningService.createOwnerRelationOfHappening();

            res.json(relationId);
        } catch (err) {
            res.send(err);
        }
    }

    public edit(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const option = req.body;
            const happening = this.relationMemberHappeningService.editHappening(id, option);

            res.json(happening);
        } catch (err) {
            res.send(err);
        }
    }

    public publish(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const happening = this.relationMemberHappeningService.publish(id);

            res.json(happening);
        } catch (err) {
            res.send(err);
        }
    }

    public addParticipant(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const participant = this.relationMemberHappeningService.addParticipant(id, name);

            res.json(participant);
        } catch (err) {
            res.send(err);
        }

    }

    public getDetailedParticipantListInformation(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const memberUniqueLinkDataList = this.relationMemberHappeningService.getDetailedParticipantListInformation(id);

            res.json(memberUniqueLinkDataList);
        } catch (err) {
            res.send(err);
        }
    }

    public generateDetailedParticipantListInformation(req: Request, res: Response) {
        try {
            const { happening } = req.body;
            const { id } = req.params;
            const memberUniqueLinkDataList = this.relationMemberHappeningService.generateDetailedParticipantListInformation(id, happening);

            res.json(memberUniqueLinkDataList);
        } catch (err) {
            res.send(err);
        }
    }
}
