import supertest from 'supertest';
import applicationServer, { mongoDb } from '../index';
import RoutePaths from '../core/webserver/routes.constans';
import HappeningModel from './happening.model';
import { Happening } from './happening.interface';
import { Member } from '../member/member.interface';
import MemberModel from '../member/member.model';

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

const HAPPENING_LIST_MOCK: Happening[] = [
  {
    id: '0',
    name: 'Happening Madden',
    description: '',
    isPublish: false,
    createdAt:
      'Sat Nov 04 2023 09:32:40 GMT+0100 (Central European Standard Time)',
    memberIds: ['0', '1', '2', '3', '4', '5'],
  },
  {
    id: '1',
    name: 'Happening Sloan',
    description: '',
    isPublish: true,
    createdAt:
      'Sat Nov 04 2023 09:32:40 GMT+0100 (Central European Standard Time)',
    memberIds: ['0', '11', '22'],
  },
];

describe('`ROUTE_PATHS.happening` - GET', () => {
  beforeAll(async () => {
    // populateTestDatabase
    await MemberModel.create(MEMBER_LIST_MOCK);
    await HappeningModel.create(HAPPENING_LIST_MOCK);
  });

  afterAll(async () => {
    // clearTestDatabase
    await MemberModel.deleteMany({});
    await HappeningModel.deleteMany({});
    applicationServer.close();
    mongoDb.close();
  });

  test('returns status property', async () => {
    const response = await request.get(RoutePaths.happening);
    expect(response.status).toEqual(200);
  });
  test('size of the list is equal to mock test database', async () => {
    const response = await request.get(RoutePaths.happening);
    expect(response.body.length).toEqual(HAPPENING_LIST_MOCK.length);
  });
  test('should return Happening objects with only the expected properties', async () => {
    const response = await request.get(RoutePaths.happening);
    const keys = Array.from(
      new Set<string>(
        response.body.flatMap((item: Happening) => Object.keys(item)),
      ),
    );

    expect(keys.length).toEqual(1);
    expect(keys.every((key) => ['id'].includes(key))).toBeTruthy();
  });
});
