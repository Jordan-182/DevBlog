export class ArticleModel {
  constructor(
    private _id: number,
    private _title: string,
    private _slug: string,
    private _summary: string,
    private _content: string,
    private _cover_url: string,
    private _created_at: string,
    private _user_id: number
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get summary(): string {
    return this._summary;
  }

  set summary(value: string) {
    this._summary = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get cover_url(): string {
    return this._cover_url;
  }

  set cover_url(value: string) {
    this._cover_url = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    this._user_id = value;
  }
}
