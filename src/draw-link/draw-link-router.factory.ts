import { Router } from 'express';
import HappeningService from '../happening/happening.service';
import MemberService from '../member/member.service';
import HappeningMongoRepository from '../happening/happening-mongo.repository';
import MemberMongoRepository from '../member/member-mongo.repository';
import DrawLinkRouter from './draw-link.router';
import DrawLinkController from './draw-link.controller';
import DrawLinkService from './draw-link.service';
import DrawLinkMongoRepository from './draw-link-mongo.repository';

class DrawLinkRouterFactory {
  static create(): Router {
    const memberRepository = new MemberMongoRepository();
    const memberService = new MemberService(memberRepository);
    const happeningRepository = new HappeningMongoRepository();

    const happeningService = new HappeningService(memberService, happeningRepository);
    const drawLinkRepository = new DrawLinkMongoRepository();
    const drawLinkService = new DrawLinkService(happeningService, drawLinkRepository);
    const drawLinkController = new DrawLinkController(drawLinkService);

    const drawLinkRouter = new DrawLinkRouter(drawLinkController);
    return drawLinkRouter.setup();
  }
}

export default DrawLinkRouterFactory;
