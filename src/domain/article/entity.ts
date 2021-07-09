import ITopic from '../topic/type';
import Comment from './comment';
import IArticle from './type';

export default abstract class ArticleEntity {
  id: string;

  private createdAt: Date;

  protected updatedAt: Date;

  private _title: string;

  public get title(): string {
    return this._title;
  }

  private _content: string;

  public get content(): string {
    return this._content;
  }

  private _likes: number;

  private _publishedAt: Date | null;

  private _comments: Comment[];

  private _topics: ITopic[];

  constructor(article: IArticle) {
    this.id = article._id;
    this._title = article.title;
    this._content = article.content;
    this._likes = article.likes;
    this._publishedAt = article.publishedAt;
    this._topics = article.topics;
    this._comments = article.comments;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
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
  public getPublishedAt(): Date | null {
    return this._publishedAt;
  }

  /**
   * addLike
   * adds a like to this article
   */
  public addLike(): void {
    if (this._publishedAt === null) {
      throw new Error(`Article ${this.title}: can't like an unpublished article`);
    }

    this._likes += 1;
  }

  /**
   * subtractLike
   * subtracts a like from this article
   */
  public subtractLike(): void {
    if (this._publishedAt === null) {
      throw new Error(`Article ${this.title}: can't un-like an unpublished article`);
    }

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
    if (this._publishedAt !== null) {
      throw new Error(`Article ${this.title}: has already been published`);
    }
    this._publishedAt = new Date();
  }

  /**
   * unpublish
   * unpublishes this article
   */
  public unpublish(): void {
    if (this._publishedAt === null) {
      throw new Error(`Article ${this.title}: has already been unpublished`);
    }
    this._publishedAt = null;
  }

  /**
   * getComments
   * gets the comments of this article
   */
  public getComments(): Comment[] {
    return this._comments;
  }

  /**
   * addComment
   * adds a comment to this article
   */
  public addComment(comment: Comment): void {
    if (this._publishedAt === null) {
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

    this._comments.splice(_index, 1);
  }

  /**
   * getTopics
   * gets the topics this article refers to
   */
  public getTopics(): ITopic[] {
    return this._topics;
  }

  /**
   * addTopic
   * adds a topic to this article
   */
  public addTopic(topic: ITopic): void {
    this._topics.push(topic);
  }

  /**
   * removeTopic
   * removes a topic from this article
   */
  public removeTopic(topic: ITopic): void {
    const _index = this._topics.findIndex((t) => t._id === topic._id);

    if (_index === -1) {
      throw new Error(`Article ${this.title}: does not contain topic`);
    }

    this._topics.splice(_index, 1);
  }

  public asIArticle(): IArticle {
    return {
      _id: this.id,
      title: this._title,
      content: this._content,
      likes: this._likes,
      comments: this._comments,
      topics: this._topics,
      publishedAt: this._publishedAt,
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    } as IArticle;
  }
}
