export enum MessageType {
  SYSTEM = 'system',
  TEXT = 'text',
  IMAGE = 'image',
  DOC = 'doc',
  VOICE = 'voice',
  TIMELINE = 'timeline',
  CONTACT = 'contact',
}
export interface Message {
  _id: string;
  type: string;
  from: string;
  to: string;
  text?: string;
  doc?: string;
  image?: string;
  voice?: string;
  avatar?: string;
  contact?: {
    _id: string;
    avatar: string;
    displayName: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
