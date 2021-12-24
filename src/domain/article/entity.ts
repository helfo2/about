import ITopic from '../topic/type';
import Comment from './comment';
import IArticle from './type';

export default abstract class ArticleEntity {
  id: string;

  protected abstract _createdAt: Date;

  protected abstract _updatedAt: Date;

  protected abstract _title: string;

  protected abstract _content: string;

  protected abstract _likes: number;

  protected abstract _publishedAt: Date | null;

  protected abstract _comments: Comment[];

  protected abstract _topics: ITopic[];

  constructor(article: IArticle) {
    this.id = article._id;
  }

  public abstract get title(): string;
  public abstract get content(): string;
  public abstract get createdAt(): Date;
  public abstract get updatedAt(): Date;
  public abstract get likes(): number;
  public abstract get publishedAt(): Date | null;
  public abstract get comments(): Comment[];
  public abstract get topics(): ITopic[];

  /**
   * addLike
   * adds a like to this article
   */
  public abstract addLike(): void;

  /**
   * subtractLike
   * subtracts a like from this article
   */
  public abstract subtractLike(): void;

  /**
   * publish
   * publishes this article
   */
  public abstract publish(): void;

  /**
   * unpublish
   * unpublishes this article
   */
  public abstract unpublish(): void;

  /**
   * addComment
   * adds a comment to this article
   */
  public abstract addComment(comment: Comment): void;

  /**
   * removeComment
   * removes a comment from this article
   */
  public abstract removeComment(comment: Comment): void;

  /**
   * addTopic
   * adds a topic to this article
   */
  public abstract addTopic(topic: ITopic): void;

  /**
   * removeTopic
   * removes a topic from this article
   */
  public abstract removeTopic(topic: ITopic): void;

  /** 
   * asIArticle
   * converts this object to its type definition
  */
  public abstract asIArticle(): IArticle;
}
