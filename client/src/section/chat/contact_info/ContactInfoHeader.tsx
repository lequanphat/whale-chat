import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { IoExitOutline, IoPersonAddOutline, IoPersonCircleOutline, IoVideocamOutline } from 'react-icons/io5';
import { PiPhoneLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ContactType, stateType } from '../../../store/types';

export const ContactInfoHeader = () => {
  const { currentContact } = useSelector((state: stateType) => state.chat);
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
        <Avatar src={currentContact?.avatar} alt="avt" sx={{ width: 62, height: 62 }} />
        <Typography variant="subtitle1">{currentContact?.displayName || currentContact?.groupName}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-evenly">
        {currentContact?.type === ContactType.USER ? (
          <>
            <Stack direction="column" alignItems="center">
              <IconButton
                onClick={() => {
                  navigate(`/personal/${currentContact?._id}`);
                }}
              >
                <IoPersonCircleOutline />
              </IconButton>
              <Typography variant="body1">Profile</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <PiPhoneLight />
              </IconButton>
              <Typography variant="body1">Voice</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <IoVideocamOutline size={22} />
              </IconButton>
              <Typography variant="body1">Video</Typography>
            </Stack>
          </>
        ) : (
          <>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <IoPersonAddOutline />
              </IconButton>
              <Typography variant="body1">Add member</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <IoExitOutline />
              </IconButton>
              <Typography variant="body1">Leave group</Typography>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};
