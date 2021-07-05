import Comment from './comment';

export default abstract class ArticleEntity {
  id: string;

  private _createdAt: Date | undefined;

  protected _updatedAt: Date | undefined;

  private _title: string;

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  private _content: string;

  public get content(): string {
    return this._content;
  }

  public set content(value: string) {
    this._content = value;
  }

  private _likes: number;

  private _publishedAt: Date | undefined;

  private _comments: Comment[];

  constructor(title: string, content: string) {
    this.id = '';

    const now = new Date();
    this._createdAt = now;
    this._updatedAt = now;
    this._title = title;
    this._content = content;
    this._likes = 0;
    this._publishedAt = undefined;
    this._comments = [];
  }

  save(): void {
    this._updatedAt = new Date();
  }

  getCreatedAt(): Date | undefined {
    return this._createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this._updatedAt;
  }

  /**
   * getLikes
   * gets the number of likes of this article
   */
  public getLikes(): number {
    return this._likes;
  }

  /**
   * getPublishedAt
   * gets the date in which this article has been published
   */
  public getPublishedAt(): Date | undefined {
    return this._publishedAt;
  }

  /**
   * addLike
   * adds a like to this article
   */
  public addLike(): void {
    this._likes += 1;
  }

  /**
   * subtractLike
   * subtracts a like from this article
   */
  public subtractLike(): void {
    if (this._likes <= 0) {
      throw new Error(`Article ${this.title}: likes are already zero`);
    }
    this._likes -= 1;
  }

  /**
   * publish
   * publishes this article
   */
  public publish(): void {
    if (this._publishedAt !== undefined) {
      throw new Error(`Article ${this.title}: has already been published`);
    }
    this._publishedAt = new Date();
  }

  /**
   * unpublish
   * unpublishes this article
   */
  public unpublish(): void {
    if (this._publishedAt === undefined) {
      throw new Error(`Article ${this.title}: has already been unpublished`);
    }
    this._publishedAt = undefined;
  }

  /**
   * addComment
   * adds a comment to this article
   */
  public addComment(comment: Comment): void {
    if (this._publishedAt === undefined) {
      throw new Error(`Article ${this.title}: can't comment on an unpublished article`);
    }

    this._comments.push(comment);
  }

  /**
   * removeComment
   * removes a comment from this article
   */
  public removeComment(comment: Comment): void {
    const _index = this._comments.indexOf(comment);

    if (_index === -1) {
      throw new Error(`Article ${this.title}: does not contain comment`);
    }

    if (_index > -1) {
      this._comments.splice(_index, 1);
    }
  }

  /**
   * getComments
   * gets the comments of this article
   */
  public getComments(): Comment[] {
    return this._comments;
  }
}
