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

export interface CreateFriendRequestDTO {
  receiveId: string;
  text: string;
}
export interface DeleteFriendRequestDTO {
  sendId: string;
  receiveId: string;
}
export interface ContactMessageDTO {
  from: string;
  to: string;
  contact: {
    _id: string;
    avatar: string;
    displayName: string;
    email: string;
  };
}

