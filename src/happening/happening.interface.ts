export interface HappeningView {
  id: string;
}

export interface Happening {
  id: string;
  name: string;
  description: string;
  isPublish: boolean;
  memberIds: string[];
  createdAt: string;
}
