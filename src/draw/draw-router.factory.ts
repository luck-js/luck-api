import { Router } from 'express';
import DrawRouter from './draw.router';
import DrawController from './draw.controller';
import DrawService from './draw.service';
import DrawMongoRepository from './draw-mongo.repository';
import HappeningService from '../happening/happening.service';
import DrawLinkService from '../draw-link/draw-link.service';
import MemberService from '../member/member.service';
import HappeningMongoRepository from '../happening/happening-mongo.repository';
import MemberMongoRepository from '../member/member-mongo.repository';
import DrawLinkMongoRepository from '../draw-link/draw-link-mongo.repository';

class DrawRouterFactory {
  static create(): Router {
    const memberRepository = new MemberMongoRepository();
    const memberService = new MemberService(memberRepository);
    const happeningRepository = new HappeningMongoRepository();

    const happeningService = new HappeningService(memberService, happeningRepository);
    const drawLinkRepository = new DrawLinkMongoRepository();
    const drawLinkService = new DrawLinkService(happeningService, drawLinkRepository);
    const drawRepository = new DrawMongoRepository();

    const drawService = new DrawService(happeningService, drawLinkService, drawRepository);
    const drawController = new DrawController(drawService);

    const drawRouter = new DrawRouter(drawController);
    return drawRouter.setup();
  }
}

export default DrawRouterFactory;
