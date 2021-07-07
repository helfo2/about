export default class Comment {
  private _description: string;

  public get description(): string {
    return this._description;
  }

  private _madeAt: Date;

  public get madeAt(): Date {
    return this._madeAt;
  }

  constructor(description: string) {
    this._description = description;
    this._madeAt = new Date();
  }
}
