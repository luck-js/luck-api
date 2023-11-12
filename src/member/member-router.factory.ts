import { Router } from 'express';
import MemberRouter from './member.router';
import MemberController from './member.controller';
import MemberService from './member.service';
import MemberMongoRepository from './member-mongo.repository';

class MemberRouterFactory {
  static create(): Router {
    const memberRepository = new MemberMongoRepository();
    const memberService = new MemberService(memberRepository);
    const memberController = new MemberController(memberService);

    const memberRouter = new MemberRouter(memberController);
    return memberRouter.setup();
  }
}

export default MemberRouterFactory;
