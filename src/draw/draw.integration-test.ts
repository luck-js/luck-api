import supertest from 'supertest';
import applicationServer, { mongoDb } from '../index';
import RoutePaths from '../core/webserver/routes.constans';
import { NewDrawView } from './draw.interface';
import { NewMember } from '../member/member.interface';
import DrawModel from './draw.model';
import DrawLinkModel from '../draw-link/draw-link.model';
import HappeningModel from '../happening/happening.model';
import MemberModel from '../member/member.model';

const request = supertest(applicationServer);

describe('`ROUTE_PATHS.draw` - POST', () => {
  let response: supertest.Response;
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
    response = await request.post(RoutePaths.draw).send(payload);
  });

  afterAll(async () => {
    // clearTestDatabase
    await DrawModel.deleteMany({});
    await DrawLinkModel.deleteMany({});
    await HappeningModel.deleteMany({});
    await MemberModel.deleteMany({});
    applicationServer.close();
    mongoDb.close();
  });

  test('returns status property', async () => {
    expect(response.status).toEqual(200);
  });
  test('should return object with only the id property', async () => {
    const keys = Object.keys(response.body);

    expect(keys.length).toEqual(3);
    expect(keys.every((key) => ['name', 'description', 'members'].includes(key))).toBeTruthy();
  });
});
