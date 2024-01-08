export class createFriendRequestDTO {
  sendId: string;
  receiveId: string;
  text: string;
}
export class deleteFriendRequestDTO {
  sendId: string;
  receiveId: string;
}
export enum FriendRequestType {
  SEND = 'send',
  RECEIVE = 'receive',
}
