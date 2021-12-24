import ITopic from '../topic/type';
import Comment from './comment';
import comment from './comment';
import ArticleEntity from './entity';
import IArticle from './type';

export default class Article extends ArticleEntity {
    protected _createdAt!: Date;
    protected _updatedAt!: Date;
    protected _publishedAt: Date | null;
    protected _comments: comment[];
    protected _topics: ITopic[];
    protected _likes: number;
    protected _content!: string;
    protected _title!: string;

    constructor(article: IArticle) {
        super(article);

        this._title = article.title;
        this._content = article.content;
        this._likes = article.likes;
        this._publishedAt = article.publishedAt;
        this._topics = article.topics;
        this._comments = article.comments;
        this._createdAt = article.createdAt;
        this._updatedAt = article.updatedAt;
      }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
    
    public get likes(): number {
        return this._likes;
    }
    
    public get publishedAt(): Date | null {
        return this._publishedAt;
    }

    public get comments(): Comment[] {
        return this._comments;
    }

    public get topics(): ITopic[] {
        return this._topics;
    }

    public addLike(): void {
        if (this._publishedAt === null) {
            throw new Error(`Article ${this.title}: can't like an unpublished article`);
        }

        this._likes += 1;
    }

    public subtractLike(): void {
        if (this._publishedAt === null) {
            throw new Error(`Article ${this.title}: can't un-like an unpublished article`);
        }

        if (this._likes <= 0) {
            throw new Error(`Article ${this.title}: likes are already zero`);
        }

        this._likes -= 1;
    }
    
    public publish(): void {
        if (this._publishedAt !== null) {
            throw new Error(`Article ${this.title}: has already been published`);
        }

        this._publishedAt = new Date();
    }

    public unpublish(): void {
        if (this._publishedAt === null) {
            throw new Error(`Article ${this.title}: has already been unpublished`);
        }

        this._publishedAt = null;
    }

    public addComment(comment: Comment): void {
        if (this._publishedAt === null) {
            throw new Error(`Article ${this.title}: can't comment on an unpublished article`);
        }

        this._comments.push(comment);
    }

    public removeComment(comment: Comment): void {
        const _index = this._comments.indexOf(comment);

        if (_index === -1) {
            throw new Error(`Article ${this.title}: does not contain comment`);
        }

        this._comments.splice(_index, 1);
    }

    public addTopic(topic: ITopic): void {
        this._topics.push(topic);
    }

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
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        } as IArticle;
    }
}
