import { Router, Request, Response } from 'express';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';
import { ParticipationHappeningApi } from './participation-happening.api';
import { HappeningApi } from './happening.api';

const router: Router = Router();

const DIContainer = DIContainerProvider();
const participationHappeningApi = DIContainer.get<ParticipationHappeningApi>(IDENTIFIER.ParticipationHappeningApi);
const happeningApi = DIContainer.get<HappeningApi>(IDENTIFIER.HappeningApi);

router.route('/participation-happening/:id')
    .get((req: Request, res: Response) => participationHappeningApi.getDataView(null));

router.route('/participation-happening/matched-member/:id')
    .get((req: Request, res: Response) => participationHappeningApi.getMatchedMember(null));

router.route('/happening/create')
    .post((req: Request, res: Response) => happeningApi.create());

router.route('/happening/edit/:id')
    .post((req: Request, res: Response) => happeningApi.edit(null, null));

router.route('/happening/add-participant/:id')
    .post((req: Request, res: Response) => happeningApi.addParticipant(null, null));

router.route('/happening/publish/:id')
    .post((req: Request, res: Response) => happeningApi.publish(null));

router.route('/happening/get-detailed-member-list-information/:id')
    .get((req: Request, res: Response) => happeningApi.getDetailedParticipantListInformation(null));

export default router;
