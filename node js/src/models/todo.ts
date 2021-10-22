interface TodoInterface {
  title: string;
  id: string;
}

export class Todo implements TodoInterface {
  title: string;
  id: string;
  constructor(title: string, id: string) {
    this.title = title;
    this.id = id;
  }
}
