import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { MdOutlineFileDownload } from 'react-icons/md';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import download from 'downloadjs';
import default_img from '../../assets/default-img.jpg';
import getFileImage from '../../utils/getFileImage';
import api from '../../api/internal';
import { Message } from './types';
import { IoPlay, IoStop } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Message_Option = [
  {
    title: 'Reply',
  },
  {
    title: 'React to message',
  },
  {
    title: 'Forward message',
  },
  {
    title: 'Report',
  },
  {
    title: 'Delete',
  },
];

export const MessagesOption = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <PiDotsThreeVerticalBold
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_Option.map((item, index) => {
            return (
              <MenuItem key={index} onClick={handleClose} sx={{ fontSize: 14, fontWeight: 400 }}>
                {item.title}
              </MenuItem>
            );
          })}
        </Stack>
      </Menu>
    </>
  );
};
export const MessageWrapper = React.memo(
  ({ fromSelf, avatar, children }: { fromSelf: boolean; avatar: string; children: ReactElement }) => {
    return (
      <Stack direction="row" justifyContent={fromSelf === true ? 'end' : 'start'} width="100%">
        <Box width={'52px'}>{!fromSelf && avatar && <Avatar src={avatar} />}</Box>
        {children}
      </Stack>
    );
  },
);
const TextMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();

  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Box
        sx={{
          backgroundColor: fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
          borderRadius: 1.8,
          maxWidth: '45%',
          p: '10px 16px',
        }}
      >
        {!fromSelf && (
          <Typography variant="body2" fontSize={14} color={theme.palette.text.primary}>
            {msg.authorName}
          </Typography>
        )}
        <Typography variant="body1" color={fromSelf ? '#fff' : theme.palette.text.primary}>
          {msg.text}
        </Typography>
      </Box>
    </MessageWrapper>
  );
});
const ContactMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Stack spacing={0.8}>
        {!fromSelf && (
          <Stack direction="row">
            <Typography
              variant="body2"
              fontSize={14}
              sx={{
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                px: 1.6,
                py: 0.1,
                borderRadius: 999,
              }}
            >
              {msg.authorName}
            </Typography>
          </Stack>
        )}
        <Box
          sx={{
            backgroundColor: fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
            borderRadius: 1.8,
            p: '10px 16px',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.4}>
            <Avatar src={msg.contact.avatar} />
            <Stack color={fromSelf ? '#fff' : theme.palette.text.primary}>
              <Typography variant="body2">{msg.contact.displayName}</Typography>
              <Typography variant="body1">{msg.contact.email}</Typography>
            </Stack>
          </Stack>
          <Stack alignItems="end">
            <Button
              sx={{ color: fromSelf ? '#fff' : theme.palette.text.primary }}
              onClick={() => {
                navigate(`/personal/${msg.contact?._id}`);
              }}
            >
              View details
            </Button>
          </Stack>
        </Box>
      </Stack>
    </MessageWrapper>
  );
});
const SystemMessage = React.memo(({ msg }: { msg: Message }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Typography
        variant="body1"
        fontSize="13px"
        sx={{
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.paper,
          borderRadius: '999px',
          p: '4px 16px',
          opacity: 0.8,
        }}
      >
        {msg.text}
      </Typography>
    </Stack>
  );
});

const DocMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();

  const handleDownloadFile = useCallback(async (filePath: string) => {
    try {
      let fileName: string | string[] = filePath.split('/');
      fileName = fileName[fileName.length - 1];
      const response = await api.get(`/messages/download/${fileName}`, {
        responseType: 'blob',
      });
      download(response.data, fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }, []); 
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Stack spacing={0.8}>
        {!fromSelf && (
          <Stack direction="row">
            <Typography
              variant="body2"
              fontSize={14}
              sx={{
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                px: 1.6,
                py: 0.1,
                borderRadius: 999,
              }}
            >
              {msg.authorName}
            </Typography>
          </Stack>
        )}
        <Box
          p={1.2}
          sx={{
            backgroundColor: fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
            borderRadius: 1.2,
            width: 'max-content',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3} sx={{ backgroundColor: 'transparent' }}>
            <img src={getFileImage(msg.text)} alt="123" style={{ maxHeight: 50 }} />

            <Typography
              variant="body1"
              color={fromSelf ? '#fff' : theme.palette.text.primary}
              sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {msg.text}
            </Typography>
            <IconButton onClick={() => handleDownloadFile(msg.doc)}>
              <MdOutlineFileDownload color={fromSelf ? '#fff' : theme.palette.text.primary} />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </MessageWrapper>
  );
});

const MediaMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();
  const [imageLink, setImageLink] = useState(msg.image);
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Stack spacing={0.8}>
        {!fromSelf && (
          <Stack direction="row">
            <Typography
              variant="body2"
              fontSize={14}
              sx={{
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                px: 1.6,
                py: 0.1,
                borderRadius: 999,
              }}
            >
              {msg.authorName}
            </Typography>
          </Stack>
        )}
        <Box
          sx={{
            width: 300,
            maxHeight: 600,
            borderRadius: 1.2,
            overflow: 'hidden',
            boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
          }}
        >
          <img
            src={imageLink}
            alt={'image'}
            style={{ width: '100%', height: '100%' }}
            onError={() => {
              setImageLink(default_img);
            }}
          />
        </Box>
      </Stack>
    </MessageWrapper>
  );
});
const VoiceMessage = React.memo(({ msg, fromSelf }: { msg: Message; fromSelf: boolean }) => {
  const theme = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  //handle
  const handlePlayAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const handlePauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // effect
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleAudioTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleAudioLoadedMetadata);
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleAudioTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleAudioLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

  // render
  return (
    <MessageWrapper fromSelf={fromSelf} avatar={msg.avatar}>
      <Stack spacing={0.8}>
        {!fromSelf && (
          <Stack direction="row">
            <Typography
              variant="body2"
              fontSize={14}
              sx={{
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                px: 1.6,
                py: 0.1,
                borderRadius: 999,
              }}
            >
              {msg.authorName}
            </Typography>
          </Stack>
        )}
        <Stack
          direction="row"
          alignItems="center"
          p={1}
          spacing={1}
          sx={{
            backgroundColor: fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
            borderRadius: 1.2,
            color: fromSelf ? '#fff' : theme.palette.text.primary,
          }}
        >
          <IconButton
            sx={{ color: fromSelf ? '#fff' : theme.palette.text.primary }}
            onClick={isPlaying ? handlePauseAudio : handlePlayAudio}
          >
            {isPlaying ? <IoStop size={20} /> : <IoPlay size={20} />}
          </IconButton>
          <Typography>{`${Math.floor(currentTime)}/${Math.floor(duration)}`}</Typography>
          {isPlaying && <CircularProgress size={20} color="success" />}
          <audio ref={audioRef}>
            <source src={msg.voice} />
          </audio>
        </Stack>
      </Stack>
    </MessageWrapper>
  );
});
const TimeLine = ({ text }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Typography
        variant="body1"
        fontSize="12px"
        sx={{
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.paper,
          borderRadius: '999px',
          p: '4px 16px',
          opacity: 0.8,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export { TimeLine, TextMessage, MediaMessage, DocMessage, VoiceMessage, SystemMessage, ContactMessage };
