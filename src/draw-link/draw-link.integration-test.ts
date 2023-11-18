import supertest from 'supertest';
import applicationServer, { mongoDb } from '../index';
import RoutePaths from '../core/webserver/routes.constans';
import { NewMember } from '../member/member.interface';
import HappeningModel from '../happening/happening.model';
import MemberModel from '../member/member.model';
import { DrawView, NewDrawView } from '../draw/draw.interface';
import DrawModel from '../draw/draw.model';
import DrawLinkModel from './draw-link.model';

const request = supertest(applicationServer);

// TODO: Enhance this test for greater autonomy and maintainability.
describe('`ROUTE_PATHS.draw-link`', () => {
  afterAll(async () => {
    applicationServer.close();
    mongoDb.close();
  });

  describe('(draw) POST & (draw-link) GET', () => {
    let postResponse: supertest.Response;
    let getResponse: supertest.Response;
    let getDrawLinkResponse: supertest.Response;
    const name = 'New Happening Name';
    const description = 'New Happening Description';
    const members: NewMember[] = [
      {
        name: 'Kline',
      },
      {
        name: 'Le',
      },
      {
        name: 'Barlow',
      },
      {
        name: 'Jean',
      },
    ];
    const payload: NewDrawView = { name, description, members };

    beforeAll(async () => {
      postResponse = await request.post(RoutePaths.draw).send(payload);
      getResponse = await request.get(`${RoutePaths.draw}/${postResponse.body.id}`);
      const { uniqueLink } = (getResponse.body as DrawView).members[0];
      getDrawLinkResponse = await request.get(`${RoutePaths.drawLink}/${uniqueLink}`);
    });

    afterAll(async () => {
      // clearTestDatabase
      await DrawModel.deleteMany({});
      await DrawLinkModel.deleteMany({});
      await HappeningModel.deleteMany({});
      await MemberModel.deleteMany({});
    });

    test('returns status property', async () => {
      expect(getDrawLinkResponse.status).toEqual(200);
    });
    test('should return object with only the id property', async () => {
      const keys = Object.keys(getDrawLinkResponse.body);

      expect(keys.length).toEqual(5);
      expect(
        keys.every((key) =>
          ['id', 'name', 'description', 'memberName', 'matchedMemberName'].includes(key),
        ),
      ).toBeTruthy();
    });
  });
});
