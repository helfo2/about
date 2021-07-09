import ITopic from '../topic/type';
import Comment from './comment';

interface IArticle {
  _id: string;
  title: string;
  content: string;
  likes: number;
  publishedAt: Date | null;
  comments: Comment[];
  topics: ITopic[];
  createdAt: Date;
  updatedAt: Date;
}

export default IArticle;
