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
