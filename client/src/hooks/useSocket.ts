import { useContext } from 'react';
import { SocketContext } from '../contexts/socketContext';

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
  return { emitMessage, emitFriendRequest };
};
