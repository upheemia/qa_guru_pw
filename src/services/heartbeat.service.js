import { test } from "@playwright/test";

export class Heartbeatervice {
  constructor(request) {
    this.request = request;
  }
    async deleteHeartbeat(token, testinfo) {
    return test.step("delete /heartbeat", async () => {
        const response = await this.request.delete(
        `${testinfo.project.use.apiURL}/heartbeat`,
        {   
            headers: { "X-CHALLENGER": token },
        }
        );
        return response;
    });
    }
    
    async patchHeartbeat(token, testinfo) {
    return test.step("patch /heartbeat", async () => {
        const response = await this.request.patch(
        `${testinfo.project.use.apiURL}/heartbeat`,
        {   
            headers: { "X-CHALLENGER": token },
        }
        );
        return response;
    });
    }

    async postHeartbeat(token, testinfo,metod) {
    return test.step("post /heartbeat", async () => {
        const response = await this.request.post(
        `${testinfo.project.use.apiURL}/heartbeat`,
        {   
            headers: { "X-CHALLENGER": token,
            "X-HTTP-Method-Override": metod
             },
        }
        );
        return response;
    });
    }

    async postSecretToken(token, testinfo,auth) {
    return test.step("post /secret/token", async () => {
        const response = await this.request.post(
        `${testinfo.project.use.apiURL}/secret/token`,
        {   
            headers: { "X-CHALLENGER": token,
                //"X-AUTH-TOKEN": auth
             },
        }
        );
        return response;
    });
    }
}
