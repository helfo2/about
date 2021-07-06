import { CONTENT_LENGTH, TITLE_LENGTH } from './const';
import IArticle from './type';

const validateTitle = (title: string): boolean => (title.length <= TITLE_LENGTH);

const validateContent = (content: string): boolean => (content.length <= CONTENT_LENGTH);

const validateLikes = (likes: number): boolean => likes >= 0;

const validateArticle = (article: IArticle): boolean => {
  if (!validateTitle(article.title)) throw new Error('Article title is invalid');
  if (!validateContent(article.content)) throw new Error('Article content is invalid');
  if (!validateLikes(article.likes)) throw new Error('Article likes are invalid');

  return true;
};

export default validateArticle;
