interface ITopic {
  _id: string;
  _name: string;
  _description: string;
  _color: string;
  createdAt: Date;
  updatedAt: Date | undefined;
}

export default ITopic;
