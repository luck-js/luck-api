import { Router, Request, Response } from 'express';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';
import { ParticipationHappeningApi } from './participation-happening.api';
import { HappeningApi } from './happening.api';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../happening/happening.mock';
import { RELATION_INITIAL_LIST_MOCK } from '../relation-member-happening/relation-member-happening.mock';

const router: Router = Router();

const DIContainer = DIContainerProvider([...MEMBER_INITIAL_LIST_MOCK], [...HAPPENING_INITIAL_LIST_MOCK], [...RELATION_INITIAL_LIST_MOCK]);
const participationHappeningApi = DIContainer.get<ParticipationHappeningApi>(IDENTIFIER.ParticipationHappeningApi);
const happeningApi = DIContainer.get<HappeningApi>(IDENTIFIER.HappeningApi);

router
    .route('/participation-happening/:id')
    .get(participationHappeningApi.getDataView);

router
    .route('/participation-happening/matched-member/:id')
    .get(participationHappeningApi.getMatchedMember);

router
    .route('/happening/create')
    .post(happeningApi.create);

router
    .route('/happening/edit/:id')
    .post(happeningApi.edit);

router
    .route('/happening/add-participant/:id')
    .post(happeningApi.addParticipant);

router
    .route('/happening/publish/:id')
    .post(happeningApi.publish);

router
    .route('/happening/get-detailed-participant-list-information/:id')
    .get(happeningApi.getDetailedParticipantListInformation);

router
    .route('/happening/generate-detailed-participant-list-information/:id')
    .get(happeningApi.getGenerateDetailedParticipantListInformation)
    .post(happeningApi.generateDetailedParticipantListInformation);

export default router;
