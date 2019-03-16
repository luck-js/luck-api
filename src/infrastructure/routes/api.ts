import { Router, Request, Response } from 'express';
import { DIContainer } from '../di-container';
import IDENTIFIER from '../identifiers';
import { MemberParticipationController } from '../../interfaces/member-participation.controller';

const router: Router = Router();

const memberParticipationController = DIContainer.get<MemberParticipationController>(
  IDENTIFIER.MemberParticipationController,
);

router
  .route('/participation-happening/:id')
  .get((req: Request, res: Response) =>
    memberParticipationController.getMemberParticipation(req, res),
  );

router
  .route('/participation-happening/matched-member/:id')
  .get((req: Request, res: Response) => memberParticipationController.getMatchedMember(req, res));

router
  .route('/happening/create')
  .post((req: Request, res: Response) =>
    memberParticipationController.createMemberParticipation(req, res),
  );

router
  .route('/happening/edit/:id')
  .post((req: Request, res: Response) =>
    memberParticipationController.editHappeningMetadata(req, res),
  );

router
  .route('/happening/add-participant/:id')
  .post((req: Request, res: Response) =>
    memberParticipationController.addParticipantMember(req, res),
  );

router
  .route('/happening/publish/:id')
  .post((req: Request, res: Response) => memberParticipationController.publishHappening(req, res));

router
  .route('/happening/generate-detailed-participant-list-information/:id')
  .get((req: Request, res: Response) =>
    memberParticipationController.getPublishedHappening(req, res),
  )
  .post((req: Request, res: Response) =>
    memberParticipationController.createPublishedHappening(req, res),
  );

export default router;
