export class TodoBuilder {
  constructor() {
    this.title = "title";
    this.doneStatus = true;
    this.description = "description";
    this.testPriority;
    this.id;
    }

  withTitle(title) {
    this.title = title;
    return this;
  }

  withDoneStatus(doneStatus) {
    this.doneStatus = doneStatus;
    return this;
  }

  withDescription(description) {
    this.description = description;
    return this;
  }

  withTestPriority(testPriority) {
    this.testPriority = testPriority;
    return this;
  }

  withId(id) {
    this.id = id;
    return this;
  }

  build() {
    return {
      title: this.title,
      doneStatus: this.doneStatus,
      description: this.description,
      testPriority: this.testPriority
    };
  }

  // Статические методы для часто используемых сценариев
  static defaultTodo() {
    return new TodoBuilder().build();
  }

  static completedTodoWithToLongTitle() {
    return new TodoBuilder()
      .withTitle("wow this title has far too many characters to validate.")
      .withDoneStatus(true)
      .withDescription("description")
      .build();
  }
  static completedTodoWithError() {
    return new TodoBuilder()
      .withTitle("title")
      .withDoneStatus("true")
      .withDescription(44)
      .build();
  }
  static completedTodoWithNewParam() {
    return new TodoBuilder()
      .withTitle("Pending Task")
      .withDoneStatus(false)
      .withDescription("This task is pending")
      .withTestPriority("test")
      .build();
  }
  static completedTodoWithId() {
    return new TodoBuilder()
      .withTitle("Pending Task")
      .withDoneStatus(false)
      .withDescription("This task is pending")
      .withId(1)
      .build();
  }
}