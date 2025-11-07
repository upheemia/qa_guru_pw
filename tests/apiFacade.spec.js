import { test, expect } from "@playwright/test";
import { Api } from "../src/services/api.service";
let token;
test.describe("Challenge", () => {
  test.beforeAll(async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let r = await api.challenger.post(testinfo);
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
  });
  test("получить токен", async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let body = await api.challenges.get(token, testinfo);
    expect(body.challenges.length).toBe(59);
  });
});