import { useContext } from 'react';
import { SocketContext } from '../contexts/socketContext';
import { MessageType } from '../section/chat/types';

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
  const emitNotification = (data) => {
    socket.emit('send-notification', data);
  };
  const emitJoinGroup = (groupId: string) => {
    socket.emit('join-group', groupId);
  };
  const emitVideoCall = ({ to }: { to: string }) => {
    socket.emit('video-call', { to });
  };
  const emitVoiceCall = ({ to }: { to: string }) => {
    socket.emit('voice-call', { to });
  };
  const emitRefuseVideoCall = ({ to }: { to: string }) => {
    socket.emit('refuse-call', { to });
  };
  const emitAcceptVideoCall = ({ to }: { to: string }) => {
    socket.emit('accept-call', { to });
  };
  const emitInterruptVideoCall = ({ to }: { to: string }) => {
    socket.emit('interrupt-call', { to });
  };

  return {
    emitMessage,
    emitFriendRequest,
    emitAcceptFriend,
    emitNotification,
    emitJoinGroup,
    emitVideoCall,
    emitRefuseVideoCall,
    emitAcceptVideoCall,
    emitInterruptVideoCall,
    emitVoiceCall,
  };
};
