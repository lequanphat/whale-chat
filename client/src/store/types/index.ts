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
export interface relationshipType {
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
