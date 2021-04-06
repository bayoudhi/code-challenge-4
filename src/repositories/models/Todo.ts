export default class Todo {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean,
    public createdAt: number,
    public updatedAt: number,
  ) {}
}
