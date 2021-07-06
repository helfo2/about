import Comment from './comment';

interface IArticle {
  _id: string;
  title: string;
  content: string;
  likes: number;
  publishedAt: Date | undefined;
  comments: Comment[]
  createdAt: Date;
  updatedAt: Date | undefined;
}

export default IArticle;
