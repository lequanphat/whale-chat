export enum MessageType {
  SYSTEM = 'system',
  TEXT = 'text',
  IMAGE = 'image',
  DOC = 'doc',
  VOICE = 'voice',
  TIMELINE = 'timeline',
  CONTACT = 'contact',
  VIDEO_CALL = 'video_call',
  VOICE_CALL = 'voice_call',
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
  authorName?: string;
  contact?: {
    _id: string;
    avatar: string;
    displayName: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
