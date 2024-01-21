import { Box, Divider, Grid, IconButton, Stack, Switch, Typography, useTheme } from '@mui/material';
import { RxCaretRight } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegStar } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from '../../../components/scrollbar/Scrollbar';
import { ContactType, stateType } from '../../../store/interface';
import React from 'react';
import { toggleContact, updateContactType } from '../../../store/slices/appSlice';
import { ContactInfoHeader } from './ContactInfoHeader';
import { ContactInfoFooter } from './ContactInfoFooter';

const ContactInfo = ({ currentMessages }): JSX.Element => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentContact } = useSelector((state: stateType) => state.chat);

  // render
  return (
    <Stack width={320} height="100%">
      <Box
        sx={{
          width: '100%',
          boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
        }}
      >
        <Stack direction="row" height={70} alignItems="center" justifyContent="space-between" spacing={3} p={2}>
          <Typography variant="subtitle2">Contact Info</Typography>
          <IconButton
            onClick={() => {
              dispatch(toggleContact());
            }}
          >
            <IoCloseOutline />
          </IconButton>
        </Stack>
      </Box>
      <Scrollbar height={'calc(100vh - 70px)'} sx={{ flexGrow: 1 }} p={3} spacing={3}>
        <ContactInfoHeader />
        <Divider />
        {currentContact?.type === ContactType.USER && (
          <>
            <Stack>
              <Typography variant="subtitle2" mb={1}>
                About
              </Typography>
              <Typography variant="body1" fontSize={15}>
                {currentContact?.about}
              </Typography>
            </Stack>
            <Divider />
          </>
        )}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">Media, Links and Docs</Typography>
          <IconButton
            onClick={() => {
              dispatch(updateContactType({ type: 'SHARED' }));
            }}
          >
            <RxCaretRight size={26} />
          </IconButton>
        </Stack>
        <Grid container>
          {currentMessages.filter((message) => message.type === 'image').length ? (
            currentMessages
              .filter((message) => message.type === 'image')
              .reverse()
              .slice(0, 3)
              .map((item, index) => {
                return (
                  <Grid key={index} item xs={4} p={0.6}>
                    <img src={item.image} alt={item.from} style={{ objectFit: 'cover', height: 60 }} />
                  </Grid>
                );
              })
          ) : (
            <Typography fontSize={14}>No image</Typography>
          )}
        </Grid>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <FaRegStar />
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
          <IconButton>
            <RxCaretRight size={26} />
          </IconButton>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IoMdNotificationsOutline size={22} />
            <Typography variant="subtitle2">Mute Notification</Typography>
          </Stack>
          <Switch inputProps={{ 'aria-label': 'controlled' }} />
        </Stack>
        <Divider />
        <ContactInfoFooter />
      </Scrollbar>
    </Stack>
  );
};

export default React.memo(ContactInfo);
