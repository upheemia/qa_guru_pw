import { ChallengerService, ChallengesService, TodosService, Heartbeatervice} from "./index";

export class Api {
  constructor(request) {
    this.request = request;
    this.challenger = new ChallengerService(request);
    this.challenges = new ChallengesService(request);
    this.todos = new TodosService(request);
    this.heartbeat = new Heartbeatervice(request)
  }
}