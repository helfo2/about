import mongoose from 'mongoose';
import IArticle from '../../domain/article/type';

const articleSchema = new mongoose.Schema<IArticle>({
  title: String,
  content: String,
  likes: Number,
  publishedAt: Date,
  comments: Array,
  topics: Array,
}, { timestamps: true });

const ArticleModel = mongoose.model('Article', articleSchema);

export default ArticleModel;
