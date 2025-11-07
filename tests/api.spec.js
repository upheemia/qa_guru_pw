import { test, expect } from '@playwright/test';
//const URL = "https://apichallenges.eviltester.com";

test.describe('apichallenges', () => {

  test('Получить токен', async ({ request }, testinfo) => { //используем фикстуру testinfo
    //можно не использовать переменную resp, а сделать let переменную r и везде поставить ее
  const r = await request.post(`${testinfo.project.use.apiURL}/challenger`);
  const headers = r.headers();
  const token = headers["x-challenger"]; //обращамся как к массиву 
  const resp = await request.get(`${testinfo.project.use.apiURL}/challenges`, {headers:{"X-CHALLENGER":token}});
  const body = await resp.json();
  expect(body.challenges.length).toBe(59); // проверяем что длина массива 58
  //console.log(resp);
  //expect(r.status()).toBe(201);
  //console.log(r.body()); скобки писать у бади обязательно
  //const resp = await request.post(`${URL}/challengers`);
  });
   
  })

 


