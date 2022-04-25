export class LoggedInUser {
  static get id(): number {
    return this._id;
  }

  static set id(value: number) {
    this._id = value;
  }
  private static _id: number = -1;
}
