import mongoose from 'mongoose';
import ITopic from '../../domain/topic/type';

const topicSchema = new mongoose.Schema<ITopic>({
  _name: String,
  _description: String,
  _color: String,
}, { timestamps: true });

const TopicModel = mongoose.model('Topic', topicSchema);

export default TopicModel;
