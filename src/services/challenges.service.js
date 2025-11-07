import { test } from "@playwright/test";

export class ChallengesService { //зачем мы создали такой сервис а не добавили все все challenger?
  constructor(request) {
    this.request = request;
  }
  async getResponse(token, testinfo) {
    return test.step("GET /challenges", async () => {
      const r = await this.request.get(
        `${testinfo.project.use.apiURL}/challenges`,
        {
          headers: { "X-CHALLENGER": token },
        }
      );
      return r;
    });
  }
}