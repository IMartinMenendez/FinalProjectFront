export class User{
  constructor(
    // private _eventId: number[],
    private _id: number,
    private _name: string,
    private _email: string,
    private _role: string,
    private _isAdmin: boolean,
    private _password: string

  ) {}

  // get eventId(): number[] {
  //   return this._eventId;
  // }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
  //
  // set eventId(value: number[]) {
  //   this._eventId = value;
  // }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
