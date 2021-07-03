export default class Comment {
  private _description: string;

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  private _madeAt: Date;

  public get madeAt(): Date {
    return this._madeAt;
  }

  public set madeAt(value: Date) {
    this._madeAt = value;
  }

  constructor(description: string) {
    this._description = description;
    this._madeAt = new Date();
  }
}
