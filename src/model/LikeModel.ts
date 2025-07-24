export class LikeModel {
  constructor(
    private _article_id?: number | null,
    private _user_id?: number | null
  ) {}

  get article_id(): number | null | undefined {
    return this._article_id;
  }

  get user_id(): number | null | undefined {
    return this._user_id;
  }

  set article_id(value: number) {
    this.article_id = value;
  }

  set user_id(value: number) {
    this.user_id = value;
  }
}
