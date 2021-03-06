export class Notification{
  constructor(
    private _id: number,
    private _userId: number,
    private _message: string,
    private _isRead: boolean,

  ) {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get isRead(): boolean {
    return this._isRead;
  }

  set isRead(value: boolean) {
    this._isRead = value;
  }
}
