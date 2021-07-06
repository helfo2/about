import Comment from './comment';
import IArticle from './type';

export default abstract class ArticleEntity {
  id: string;

  private createdAt: Date | undefined;

  protected updatedAt: Date | undefined;

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

  constructor(article: IArticle) {
    this.id = article._id;
    this._title = article.title;
    this._content = article.content;
    this._likes = article.likes;
    this._publishedAt = article.publishedAt;
    this._comments = article.comments;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
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
