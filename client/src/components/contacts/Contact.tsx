import { Avatar, Box, Button, Divider, Grid, IconButton, Stack, Switch, Typography, useTheme } from '@mui/material';
import { RxCaretRight } from 'react-icons/rx';
import { IoCloseOutline, IoExitOutline, IoPersonAddOutline, IoPersonCircleOutline, IoStar } from 'react-icons/io5';
import { FaRegStar } from 'react-icons/fa';
import { PiPhoneLight } from 'react-icons/pi';
import { MdBlock } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { IoVideocamOutline } from 'react-icons/io5';
import { faker } from '@faker-js/faker';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { useEffect, useState } from 'react';
import { BlockDialog, DeleteDialog } from '../dialog/ContactDialog';
import { ContactType, stateType } from '../../store/interface';
import React from 'react';
import { toggleContact, updateContactType } from '../../store/slices/appSlice';
import { useNavigate } from 'react-router-dom';
import { getMemberOfGroup } from '../../store/slices/chatSlice';

const Contact = ({ currentMessages }): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentContact } = useSelector((state: stateType) => state.chat);
  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [members, setMembers] = useState([]);
  // handle
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // effect
  useEffect(() => {
    (async () => {
      if (currentContact.type !== ContactType.USER) {
        const response = await dispatch(getMemberOfGroup(currentContact._id));
        if (response.payload.members) {
          setMembers(response.payload.members);
        }
      }
    })();
  }, [currentContact, dispatch]);
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
                    <img src={item.image} alt={item.from} style={{ objectFit: 'cover' }} />
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
        {currentContact?.type === ContactType.USER ? (
          <>
            <Typography variant="body1">2 group in common</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={faker.image.url()} alt={faker.person.fullName()} />
              <Stack>
                <Typography variant="subtitle2">Coding Monk</Typography>
                <Typography variant="caption">16 members</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={faker.image.url()} alt={faker.person.fullName()} />
              <Stack>
                <Typography variant="subtitle2">Coding Monk</Typography>
                <Typography variant="caption">16 members</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                onClick={() => {
                  setOpenBlock(true);
                }}
                startIcon={<MdBlock />}
                variant="outlined"
                fullWidth
              >
                Block
              </Button>
              <Button
                onClick={() => {
                  setOpenDelete(true);
                }}
                startIcon={<RiDeleteBin6Line />}
                variant="outlined"
                fullWidth
              >
                Delete
              </Button>
            </Stack>
          </>
        ) : (
          <Stack>
            <Typography variant="subtitle2" mb={2}>
              {`${currentContact?.members.length} members`}
            </Typography>

            <Stack spacing={2}>
              {members.map((member) => (
                <Stack key={member._id} direction="row" alignItems="center" spacing={1.4}>
                  <Avatar src={member.avatar} />
                  {member._id === currentContact.createdBy ? (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="body1">{member.displayName}</Typography>
                      <IoStar size={18} color="#f6e718" />
                    </Stack>
                  ) : (
                    <Typography variant="body1">{member.displayName}</Typography>
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Scrollbar>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />}
    </Stack>
  );
};

export default React.memo(Contact);
