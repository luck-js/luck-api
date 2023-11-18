import { Router } from 'express';
import MigrateRouter from './migrate.router';
import MigrateController from './migrate.controller';
import MigrateService from './migrate.service';
import MemberMongoRepository from '../member/member-mongo.repository';
import MemberService from '../member/member.service';
import HappeningMongoRepository from '../happening/happening-mongo.repository';
import HappeningService from '../happening/happening.service';
import DrawLinkMongoRepository from '../draw-link/draw-link-mongo.repository';
import DrawLinkService from '../draw-link/draw-link.service';

class MigrateRouterFactory {
  static create(): Router {
    const memberRepository = new MemberMongoRepository();
    const memberService = new MemberService(memberRepository);
    const happeningRepository = new HappeningMongoRepository();

    const happeningService = new HappeningService(memberService, happeningRepository);
    const drawLinkRepository = new DrawLinkMongoRepository();
    const drawLinkService = new DrawLinkService(happeningService, drawLinkRepository);

    const migrateService = new MigrateService(happeningService, memberService, drawLinkService);
    const drawController = new MigrateController(migrateService);

    const drawRouter = new MigrateRouter(drawController);
    return drawRouter.setup();
  }
}

export default MigrateRouterFactory;
