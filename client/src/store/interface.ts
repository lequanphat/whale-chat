import { MessageType } from '../components/chat/types';

export interface authType {
  id: string;
  email: string;
  displayName: string;
  about: string;
  avatar: string;
  auth: boolean;
  token: string;
  isLoading: boolean;
}
export interface appType {
  sidebar: {
    open: boolean;
    type: string;
  };
  snackbar: {
    open: boolean;
    message: string;
    serverity: string;
  };
}
export interface Contact {
  _id: string;
  displayName: string;
  email: string;
  avatar: string;
  about: string;
  status: string;
}
export interface ExtendContact {
  contact: Contact;
  recentMessage: {
    type: MessageType;
    text: string;
    createdAt: string;
  };
}

export interface chatType {
  contacts: ExtendContact[];
  currentContact: Contact;
  isLoading: boolean;
  isMessagesLoading: boolean;
  chats: {
    id: string;
    messages: {
      _id: string;
      type: MessageType;
      text: string;
      from: string;
      to: string;
      image?: string;
    }[];
  }[];
}
export interface stateType {
  app: appType;
  auth: authType;
  chat: chatType;
}
export interface EditProfileDTO {
  displayName: string;
  about: string;
}
export interface LoginDTO {
  email: string;
  password: string;
}
export interface RegisterDTO {
  displayName: string;
  email: string;
  password: string;
}
export interface ChangePasswordDTO {
  password: string;
  token: string;
}
