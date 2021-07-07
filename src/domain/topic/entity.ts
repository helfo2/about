import ITopic from './type';

export default abstract class TopicEntity {
  id: string;

  private createdAt: Date | undefined;

  protected updatedAt: Date | undefined;

  private _name: string;

  public get name(): string {
    return this._name;
  }

  private _description: string;

  public get description(): string {
    return this._description;
  }

  private _color: string;

  public get color(): string {
    return this._color;
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
