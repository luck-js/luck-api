import supertest from 'supertest';
import applicationServer, { mongoDb } from '../index';
import RoutePaths from '../core/webserver/routes.constans';
import MemberModel from './member.model';
import { Member } from './member.interface';

const request = supertest(applicationServer);

const MEMBER_LIST_MOCK: Member[] = [
  {
    id: '1',
    name: 'Kline',
  },
  {
    id: '2',
    name: 'Le',
  },
  {
    id: '3',
    name: 'Barlow',
  },
  {
    id: '4',
    name: 'Jean',
  },
  {
    id: '5',
    name: 'Sheila',
  },
  {
    id: '11',
    name: 'Jean 11',
  },
  {
    id: '22',
    name: 'Sheila 22',
  },
];

describe('`ROUTE_PATHS.member` - GET', () => {
  beforeAll(async () => {
    // populateTestDatabase
    await MemberModel.create(MEMBER_LIST_MOCK);
  });

  afterAll(async () => {
    // clearTestDatabase
    await MemberModel.deleteMany({});
    applicationServer.close();
    mongoDb.close();
  });

  test('returns status property', async () => {
    const response = await request.get(RoutePaths.member);
    expect(response.status).toEqual(200);
  });
  test('size of the list is equal to mock test database', async () => {
    const response = await request.get(RoutePaths.member);
    expect(response.body.length).toEqual(MEMBER_LIST_MOCK.length);
  });
  test('should return Member objects with only the expected properties', async () => {
    const response = await request.get(RoutePaths.member);
    const keys = Array.from(
      new Set<string>(
        response.body.flatMap((item: Member) => Object.keys(item)),
      ),
    );

    expect(keys.length).toEqual(2);
    expect(keys.every((key) => ['id', 'name'].includes(key))).toBeTruthy();
  });
});
