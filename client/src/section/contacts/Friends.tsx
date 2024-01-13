import { Avatar, Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import StyledBadge from '../../components/avatar/StyledBadge';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { ContactType, stateType } from '../../store/interface';

const Friends = () => {
  const theme = useTheme();
  const { contacts } = useSelector((state: stateType) => state.chat);
  return (
    <Stack flexGrow={1}>
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{
          height: 50,
          width: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
        }}
        p={2}
      >
        <Typography variant="body2">
          My Friends ({contacts.filter((contact) => contact.contact.type === ContactType.USER).length}){' '}
        </Typography>
      </Stack>
      <Stack>
        {contacts
          .filter((contact) => contact.contact.type === ContactType.USER)
          .map((contact) => {
            return (
              <Stack
                key={contact.contact._id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                p={2.2}
                sx={{ ':hover': { bgcolor: theme.palette.background.paper } }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box>
                    {contact.contact.status === 'online' ? (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        <Avatar alt="Remy Sharp" src={contact.contact.avatar} />
                      </StyledBadge>
                    ) : (
                      <Avatar alt="Remy Sharp" src={contact.contact.avatar} />
                    )}
                  </Box>
                  <Stack>
                    <Typography variant="body2">{contact.contact.displayName}</Typography>
                    <Typography variant="body1" fontSize={14}>{contact.contact.email}</Typography>
                  </Stack>
                </Stack>
                <IconButton>
                  <IoEllipsisVertical size={18} />
                </IconButton>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
export default Friends;
