export class User {
  constructor(
    public name: string,
    public surname: string,
    public age: number,
    public dni: string,
    public selected?: boolean
  ) { }
};
