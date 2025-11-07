import { test, expect } from "@playwright/test";
import { Api } from "../src/services/api.service";
let token;
test.describe.only("Challenge", () => {
  test.beforeAll(async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let r = await api.challenger.post(testinfo);
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
    expect(r.status()).toBe(201);
  });
  test("Проверить размер тела и статус код", async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.challenges.getResponse(token, testinfo);
    let body = await response.json();
    expect(body.challenges.length).toBe(59);
    expect(response.status()).toBe(200);
  });
});