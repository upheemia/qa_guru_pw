import { test, expect } from '@playwright/test';
import { ChallengerService } from '../src/services/index';
import { Api } from '../src/services/api.service';

let token;

test.describe('apichallenges', () => {
  test.beforeEach(async ({ request }, testinfo) => {
  let r = await request.post(`${testinfo.project.use.apiURL}/challenger`);
  const headers = r.headers();
  token = headers["x-challenger"];

  })

  test('Получить токен', async ({ request }, testinfo) => {
  let r = await request.get(`${testinfo.project.use.apiURL}/challenges`, {headers:{"X-CHALLENGER":token}});
  const body = await r.json();
  expect(body.challenges.length).toBe(59);
  });
   
  })
test.describe('apichallenges with service pattern', () => {
  test.skip('Получить токен', async ({ request }, testinfo) => {
    const challenger = new ChallengerService(request); //создаю новый экземпляр объекта
    let r = await challenger.post(testinfo);
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
    console.log(token);
  });
   test.skip('Получить токен с паттерном фасад', async ({ request }, testinfo) => {
    const api = new Api(request);
    let r = await api.challenger.post(testinfo);
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
    console.log(token);
  });
  });
