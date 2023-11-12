import { Request, Response } from 'express';
import MemberService from './member.service';

class MemberController {
  constructor(private memberService: MemberService) {}

  async getAll(req: Request, res: Response) {
    console.log('MemberController:getAll - init');
    try {
      const members = await this.memberService.getAll();
      res.json(members);
    } catch (error) {
      res.status(400);
      res.send(error);
    }
  }
}

export default MemberController;
