export default abstract class DatedEntity {
  id: string;

  private createdAt: Date | undefined;

  protected updatedAt: Date | undefined;

  private deletedAt: Date | undefined;

  constructor() {
    this.id = '';

    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
    this.deletedAt = undefined;
  }

  save(): void {
    this.updatedAt = new Date();
  }

  delete(): void {
    this.deletedAt = new Date();
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }
}
