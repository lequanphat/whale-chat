import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Transition from './Transition';
import { IoCameraOutline, IoCloseOutline } from 'react-icons/io5';
import { Search, SearchIconWrapper, StyledInputBase } from '../input/SearchInput';
import { CiSearch } from 'react-icons/ci';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactType, stateType } from '../../store/interface';
import { MemberItem } from './MemberItem';
import { createGroup } from '../../store/slices/chatSlice';
import { openSuccessSnackbar } from '../../store/slices/appSlice';
enum ChooseType {
  REMOVE = 'remove',
  ADD = 'add',
}
export function NewGroupDialog({ open, handleClose }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const { avatar, id } = useSelector((state: stateType) => state.auth);
  const { contacts } = useSelector((state: stateType) => state.chat);
  // state
  const [search, setSearch] = useState<string>('');
  const [members, setMembers] = useState<string[]>([id]);
  const [groupName, setGroupName] = useState<string>('My group');
  const [groupAvatar, setGroupAvatar] = useState<Blob>(null);
  const groupAvatarRef = useRef(null);

  // handle
  const handleChooseMember = (id: string, type: ChooseType) => {
    switch (type) {
      case ChooseType.ADD:
        setMembers((pre) => [...pre, id]);
        break;
      case ChooseType.REMOVE:
        setMembers((pre) => pre.filter((value) => value !== id));
        break;
      default:
        break;
    }
  };

  // handle
  const handleCreateGroup = async () => {
    const formData = new FormData();
    formData.append('groupAvatar', groupAvatar);
    formData.append('groupName', groupName);
    formData.append('members', JSON.stringify(members));
    formData.append('createdBy', id);
    const response = await dispatch(createGroup(formData));
    console.log(response);

    if (!response.payload.error) {
      dispatch(openSuccessSnackbar('Created group successfully'));
      handleClose();
    }
  };

  const handleChooseImageFile = (e) => {
    console.log(e.target.files[0]);
    setGroupAvatar(e.target.files[0]);
  };
  const openFileChooser = () => {
    groupAvatarRef.current.click();
  };
  // render
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ bgcolor: theme.palette.background.default }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">New Group</Typography>
          <IconButton onClick={handleClose}>
            <IoCloseOutline />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          pb: 2,
          bgcolor: theme.palette.background.default,
          overflowY: 'auto',
          '::-webkit-scrollbar': {
            width: 5,
          },
          '::-webkit-scrollbar-thumb': {
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        <Stack spacing={2} px={3} pb={3} pt={1} alignItems="start">
          <Stack direction="row" alignItems="center" spacing={2} width="100%">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ bgcolor: theme.palette.background.paper, borderRadius: '50%' }}
            >
              {groupAvatar ? (
                <Avatar src={URL.createObjectURL(groupAvatar)} onClick={openFileChooser} />
              ) : (
                <IconButton onClick={openFileChooser}>
                  <IoCameraOutline />
                </IconButton>
              )}
              <input
                ref={groupAvatarRef}
                type="file"
                accept="image/*,video/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  handleChooseImageFile(e);
                }}
              />
            </Stack>
            <TextField
              fullWidth
              id="standard-basic"
              label="Group name"
              variant="standard"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </Stack>
          <AvatarGroup total={members.length} max={10}>
            <Avatar key={0} alt="avatar" src={avatar} />
            {contacts
              .filter((contact) => members.includes(contact.contact._id))
              .map((contact) => (
                <Avatar key={contact.contact._id} alt={contact.contact._id} src={contact.contact.avatar} />
              ))}
          </AvatarGroup>
        </Stack>
        <Stack sx={{ width: '100%' }} px={3}>
          <Search sx={{ bgcolor: theme.palette.background.paper }}>
            <SearchIconWrapper>
              <CiSearch size={18} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
        </Stack>
        <Box py={2}>
          <Typography px={3} variant="body1" fontSize={15}>
            {search ? 'Kết quả tìm kiếm' : 'Bạn bè của bạn'}
          </Typography>
          <Stack
            spacing={2.6}
            py={2}
            sx={{
              height: '300px',
              overflowY: 'auto',
              '::-webkit-scrollbar': {
                width: 5,
              },
              '::-webkit-scrollbar-thumb': {
                bgcolor: theme.palette.background.paper,
              },
            }}
          >
            {search
              ? contacts
                  .filter(
                    (contact) =>
                      contact.contact.type === ContactType.USER &&
                      contact.contact.displayName.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((contact) => (
                    <MemberItem
                      key={contact.contact._id}
                      user={contact.contact}
                      selected={members.includes(contact.contact._id)}
                      handleChoose={handleChooseMember}
                    />
                  ))
              : contacts
                  .filter((contact) => contact.contact.type === ContactType.USER)
                  .map((contact) => (
                    <MemberItem
                      key={contact.contact._id}
                      user={contact.contact}
                      selected={members.includes(contact.contact._id)}
                      handleChoose={handleChooseMember}
                    />
                  ))}
          </Stack>
        </Box>
        <Stack pr={3} direction="row" justifyContent="end">
          <Button variant="contained" sx={{ px: 2.4, py: 0.6 }} onClick={handleCreateGroup}>
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
