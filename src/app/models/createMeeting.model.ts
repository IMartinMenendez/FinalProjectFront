export class CreateMeetingModel{
  constructor(
    private _type: string,
    private _date: Date,
    private _place: string,
    private _title: string,
    private _description: string,
    private _creator: number,
    private _attendees: number[],
    private _picture: string

  ) {}


  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
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

  get creator(): number {
    return this._creator;
  }

  set creator(value: number) {
    this._creator = value;
  }

  get attendees(): number[] {
    return this._attendees;
  }

  set attendees(value: number[]) {
    this._attendees = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }
}
