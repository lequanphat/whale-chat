import { MessageType } from '../../section/chat/types';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
export interface authType {
  id: string;
  email: string;
  displayName: string;
  about: string;
  avatar: string;
  auth: boolean;
  role: Role;
  token: string;
  isLoading: boolean;
}
export interface SendFriendRequest {
  _id: string;
  text: string;
  sendId: string;
  receiveId: {
    _id: string;
    displayName: string;
    avatar: string;
  };
  createdAt: string;
}
export interface ReceiveFriendRequest {
  _id: string;
  text: string;
  sendId: {
    _id: string;
    displayName: string;
    avatar: string;
  };
  receiveId: string;
  createdAt: string;
}
export interface relationshipType {
  receiveTotal: number;
  friendRequests: {
    send: SendFriendRequest[];
    receive: ReceiveFriendRequest[];
  };
  isLoading: boolean;
}

export interface Notification {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  seen: boolean;
}
export interface notificationType {
  unseen: number;
  notifications: Notification[];
  isLoading: boolean;
}

export interface appType {
  contactbar: {
    open: boolean;
    type: string;
  };
  snackbar: {
    open: boolean;
    message: string;
    serverity: string;
  };
  addFriendDialog: {
    open: boolean;
  };
}
export enum ContactType {
  USER = 'user',
  GROUP = 'group',
}
export interface Contact {
  type: ContactType;
  // user
  _id: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  about?: string;
  status?: string;
  // group
  groupName?: string;
  createdBy?: string;
  members?: string[];
}

export interface RecentMessage {
  type: MessageType;
  text: string;
  authorName?: string;
  createdAt: string;
}
export interface ExtendContact {
  contact: Contact;
  recentMessage: RecentMessage;
  total: number;
}

export interface Call {
  owner: string;
  contact: Contact;
  calling: boolean;
  pending: boolean;
  accepted: boolean;
  open: boolean;
}
export interface chatType {
  unseenMessage: number;
  contacts: ExtendContact[];
  currentContact: Contact;
  isLoading: boolean;
  isMessagesLoading: boolean;
  call: Call;
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
  relationship: relationshipType;
  notifications: notificationType;
}
