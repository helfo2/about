import ITopic from './type';

export default abstract class TopicEntity {
  id: string;

  private createdAt: Date | undefined;

  protected updatedAt: Date | undefined;

  private _name: string;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  private _description: string;

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  private _color: string;

  public get color(): string {
    return this._color;
  }

  public set color(value: string) {
    this._color = value;
  }

  constructor(topic: ITopic) {
    this.id = topic._id;
    this._name = topic.name;
    this._description = topic.description;
    this._color = topic.color;
    this.createdAt = topic.createdAt;
    this.updatedAt = topic.updatedAt;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }
}
