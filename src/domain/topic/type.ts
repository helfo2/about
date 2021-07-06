interface ITopic {
  _id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | undefined;
}

export default ITopic;
