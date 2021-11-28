export class Course{
  constructor(
    private _creatorId: number,
    private _title: string,
    private _description: string,
    private _link: string,
    private _picture: string

  ) {}


  get creatorId(): number {
    return this._creatorId;
  }

  set creatorId(value: number) {
    this._creatorId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }
}
