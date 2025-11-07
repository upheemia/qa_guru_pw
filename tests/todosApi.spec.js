import { test, expect } from "@playwright/test";
import { Api } from "../src/services/api.service";
import { describe } from "node:test";
//import { test as api} from "../src/fixtures/fixture";
import { TodoBuilder } from "../src/builders/builder";

let token;

test.describe("API tests", () => {
  test.beforeAll(async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let r = await api.challenger.post(testinfo);
    const headers = r.headers();
    console.log(`${testinfo.project.use.apiURL}${headers.location}`);
    token = headers["x-challenger"];
  });
  //эта фикстура не сработала
  // test.only("Получить статус 200 от /todos", { tag: '@API' }, async ({ api, request }, testinfo) => {
  //   let response = await api.todos.getTodos(token, testinfo);
  //   let body = await response.json();
  //   expect(body.todos.length).toBe(10);
  //   expect(response.status()).toBe(200);
  // });
  test("Получить статус 200 от /todos", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.todos.getTodos(token, testinfo);
    let body = await response.json();
    expect(body.todos.length).toBe(10);
    expect(response.status()).toBe(200);
  });
   test("Получить статус 404 от /todo", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.todos.getTodo(token, testinfo);
    expect(response.status()).toBe(404);
  });
  test("Получить статус 200 от /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.todos.getTodos(token, testinfo);
    let body = await response.json();
    const id = body.todos[0].id;
    let responseId = await api.todos.getTodosId(token, testinfo, id);
    expect(responseId.status()).toBe(200);
    expect(body.todos[0].id).toBe(id);
  });
  test("Получить статус 404 от /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    const id = -1
    let responseMaxId = await api.todos.getTodosId(token, testinfo, id);
    expect(responseMaxId.status()).toBe(404);
  });
  test("Получить статус 200 от /todos?doneStatus=true", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.todos.getTodosFilter(token, testinfo);
    let body = await response.json();
    let sortBody = body.todos.filter((element) => element.doneStatus === false);
    expect(response.status()).toBe(200);
    expect(sortBody.length).toBe(0);
  });
  test("Получить статус 200 от /todos?doneStatus=false", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.todos.getTodosFilter(token, testinfo);
    let body = await response.json();
    let sortBody = body.todos.filter((element) => element.doneStatus === true);
    expect(response.status()).toBe(200);
    expect(sortBody.length).toBe(0);
  });
  test("Получить статус 201 от POST /todos", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрята
    const todoData = TodoBuilder.defaultTodo();
    let response = await api.todos.postTodos(token, testinfo, todoData);
    let body = await response.json();
    expect(body.title).toBe(todoData.title);
    expect(body.doneStatus).toBe(todoData.doneStatus)
    expect(body.description).toBe(todoData.description)
    expect(response.status()).toBe(201);
  }); 
  test("Получить статус 400 от POST /todos", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = TodoBuilder.completedTodoWithError();
    let response = await api.todos.postTodos(token, testinfo, todoData);
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.errorMessages[0]).toEqual('Failed Validation: doneStatus should be BOOLEAN but was STRING')
  });
  //11
  test("Получить статус 400 от POST /todos из-за длинного названия", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = TodoBuilder.completedTodoWithToLongTitle();
    let response = await api.todos.postTodos(token, testinfo, todoData);
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.errorMessages[0]).toEqual('Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50')
  });
  //15
   test("Получить статус 400 от POST /todos из-за неверного параметра", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = TodoBuilder.completedTodoWithNewParam();
    let response = await api.todos.postTodos(token, testinfo, todoData);
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.errorMessages[0]).toEqual('Could not find field: testPriority')
  });
//16
  test("Получить статус 400 от PUT /todos", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
     let id = -1;
    const todoData = new TodoBuilder()
    .withTitle("title")
    .build();
    let response = await api.todos.putTodos(token, testinfo, todoData, id);
    const body = await response.json();
    expect(body.errorMessages[0]).toEqual('Cannot create todo with PUT due to Auto fields id')
    expect(response.status()).toBe(400);
  });
  //17
   test("Получить статус 200 от POST /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    let id = 1;
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = new TodoBuilder()
    .withTitle("title")
    .build();
    let response = await api.todos.postTodosId(token, testinfo, todoData, id);
    let body = await response.json();
    expect(body.title).toBe(todoData.title);
    expect(response.status()).toBe(200);
  });
  //18
   test("Получить статус 404 от POST /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    let id = -1;
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = new TodoBuilder()
    .withTitle("title")
    .build();
    let response = await api.todos.postTodosId(token, testinfo, todoData, id);
    expect(response.status()).toBe(404);
  });
  //19
  test("Получить статус 200 от PUT /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    let id = 1;
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = TodoBuilder.completedTodoWithId();
    let response = await api.todos.putTodosId(token, testinfo, todoData, id);
    let body = await response.json();
    expect(body.title).toBe(todoData.title);
    expect(body.doneStatus).toBe(todoData.doneStatus)
    expect(body.description).toBe(todoData.description)
    expect(response.status()).toBe(200);
  });
  //20
  test("Получить статус 200 от PUT /todos/{id} - не полные входные данные", { tag: '@API' }, async ({ request }, testinfo) => {
    let id = 1;
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = new TodoBuilder()
    .withTitle("title")
    .build();
    let response = await api.todos.putTodosId(token, testinfo, todoData, id);
    let body = await response.json();
    expect(body.title).toBe(todoData.title);
    expect(response.status()).toBe(200);
  });
  //21
  test("Получить статус 400 от PUT /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    let id = -1;
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = new TodoBuilder()
    .withTitle("title")
    .build();
    let response = await api.todos.putTodosId(token, testinfo, todoData, id);
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.errorMessages[0]).toEqual('Cannot create todo with PUT due to Auto fields id')
  });
  //22
  test("Получить статус 400 от PUT /todos/{id} - без id", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    const todoData = new TodoBuilder()
    .withTitle("title")
    .build();
    let response = await api.todos.putTodosId(token, testinfo, todoData);
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.errorMessages[0]).toEqual('Cannot create todo with PUT due to Auto fields id')
  });
  //23
   test("Получить статус 200 от DELETE /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let id = 1;
    let response = await api.todos.deleteTodos(token, testinfo, id);
    let responseGet = await api.todos.getTodosId(token, testinfo, id);
    expect(responseGet.status()).toBe(404);
    expect(response.status()).toBe(200);
  });
  test("Получить статус 200 от GET /todos/{id}", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.todos.getTodos(token, testinfo);
    let body = await response.json();
    const id = body.todos[0].id;
    let responseId = await api.todos.getTodosId(token, testinfo, id);
    expect(responseId.status()).toBe(200);
    expect(body.todos[0].id).toBe(id);
  });
  //30
  test("Получить статус 406 от /todos c gzip", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request);
    let accept = 'application/gzip'; //нужно спрятать в фикстуры 
    let response = await api.todos.getTodos(token, testinfo, accept);
    const body = await response.json();
    expect(response.status()).toBe(406);
    expect(body.errorMessages[0]).toEqual('Unrecognised Accept Type')
  });
  //32 
  test("Получить статус 201 от POST /todos c json", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let accept = 'application/json';
    const todoData = TodoBuilder.defaultTodo();
    let response = await api.todos.postTodos(token, testinfo, todoData, accept);
    let body = await response.json();
    expect(body.title).toBe(todoData.title);
    expect(response.status()).toBe(201);
  }); 
  //33
  test("Получить статус 406 от POST /todos c gzip", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let accept = 'application/gzip';
    const todoData = TodoBuilder.defaultTodo();
    let response = await api.todos.postTodos(token, testinfo, todoData, accept);
    const body = await response.json();
    expect(response.status()).toBe(406); 
    expect(body.errorMessages[0]).toEqual('Unrecognised Accept Type')
  }); 
  //41
  test("Получить статус 405 от DELETE /heartbeat", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.heartbeat.deleteHeartbeat(token, testinfo);
    expect(response.status()).toBe(405); 
  }); 
  //42
  test("Получить статус 405 от PATCH /heartbeat", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.heartbeat.patchHeartbeat(token, testinfo);
    expect(response.status()).toBe(500); 
  }); 
  //45
  test("Получить статус 405 от POST /heartbeat as DELETE", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let metod = 'DELETE'
    let response = await api.heartbeat.postHeartbeat(token, testinfo, metod);
    expect(response.status()).toBe(405); 
  }); 
  //46
  test("Получить статус 500 от POST /heartbeat as PATCH", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let metod = 'PATCH'
    let response = await api.heartbeat.postHeartbeat(token, testinfo, metod);
    expect(response.status()).toBe(500); 
  }); 
  //47
  test("Получить статус 501 от POST /heartbeat as TRACE", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let metod = 'TRACE'
    let response = await api.heartbeat.postHeartbeat(token, testinfo, metod);
    expect(response.status()).toBe(501); 
  }); 
  //48
  test("Получить статус 401 от POST /secret/token ", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request); //нужно спрятать в фикстуры 
    let response = await api.heartbeat.postSecretToken(token, testinfo);
    expect(response.status()).toBe(401); 
  }); 
  test("Получить статус 401 от DELETE /todos ", { tag: '@API' }, async ({ request }, testinfo) => {
    const api = new Api(request);
    let response = await api.todos.getTodos(token, testinfo);
    const body = await response.json();
    let bodyTodos = body.todos;
    expect(response.status()).toBe(200);

    if (bodyTodos.length > 0) {
        for (let todo of bodyTodos) {
            await api.todos.deleteTodos(token, testinfo, todo.id);
        }
    }
    
    // Проверяем что все удалено
    let responseAfterDelete = await api.todos.getTodos(token, testinfo);
    let { todos } = await responseAfterDelete.json();
    expect(todos.length).toBe(0);
});
});