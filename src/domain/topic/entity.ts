import DatedEntity from '../dated/entity';

export default abstract class TopicEntity extends DatedEntity {
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

  constructor(name: string, description: string, color: string) {
    super();

    this._name = name;
    this._description = description;
    this._color = color;
  }
}
