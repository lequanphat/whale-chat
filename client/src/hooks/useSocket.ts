import { useContext } from 'react';
import { SocketContext } from '../contexts/socketContext';
import { MessageType } from '../components/chat/types';

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  const emitMessage = ({
    type,
    text,
    to,
    from,
    image,
    doc,
    voice,
    contact,
    createdAt,
  }: {
    type: string;
    text?: string;
    to: string;
    from: string;
    image?: string;
    doc?: string;
    voice?: string;
    contact?: {
      _id: string;
      displayName: string;
      email: string;
      avatar: string;
    };
    createdAt: string;
  }) => {
    socket.emit('send-message', { type, text, to, from, image, doc, voice, contact, createdAt });
  };
  const emitFriendRequest = (data: {
    _id: string;
    receiveId: string;
    sendId: { _id: string; displayName: string; email: string; about: string; avatar: string };
    text: string;
    createdAt: string;
  }) => {
    socket.emit('send-friend-request', data);
  };
  const emitAcceptFriend = (data: {
    to: string;
    contact: {
      _id: string;
      displayName: string;
      email: string;
      about: string;
      avatar: string;
      status: string;
      type: string;
    };

    recentMessage: {
      _id: string;
      type: MessageType;
      from: string;
      to: string;
      text: string;
    };
    total: number;
  }) => {
    socket.emit('send-accept-friend', data);
  };
  return { emitMessage, emitFriendRequest, emitAcceptFriend };
};
