import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from './const';
import IArticle from './type';

const validateTitle = (title: string): boolean => (title.length <= TITLE_MAX_LENGTH);

const validateContent = (content: string): boolean => (content.length <= CONTENT_MAX_LENGTH);

const validateLikes = (likes: number): boolean => likes >= 0;

const validateArticle = (article: IArticle): boolean => {
  if (!validateTitle(article.title)) throw new Error('Article title is invalid');
  if (!validateContent(article.content)) throw new Error('Article content is invalid');
  if (!validateLikes(article.likes)) throw new Error('Article likes are invalid');

  return true;
};

export default validateArticle;
