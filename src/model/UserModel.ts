export class UserModel {
  constructor(
    private _id: number,
    private _name: string,
    private _email: string,
    private _avatar: string,
    private _status: string
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get status(): string {
    return this._status;
  }
}
