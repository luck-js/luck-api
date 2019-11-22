export interface IHappeningMetadata {
  name: string;
  description: string;
}

export interface IHappening extends IHappeningMetadata {
  id: string;
  name: string;
  description: string;
  isPublish: boolean;
  memberIds: string[];
  createdAt: string;
}
