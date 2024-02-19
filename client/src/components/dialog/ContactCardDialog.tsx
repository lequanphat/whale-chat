import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Transition from './Transition';
import { IoCloseOutline } from 'react-icons/io5';
import { Search, SearchIconWrapper, StyledInputBase } from '../input/SearchInput';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ContactCardItem } from './ContactCardItem';
import { stateType } from '../../store/types';

export function ContactCardDialog({ open, handleClose }) {
  const theme = useTheme();
  const { contacts } = useSelector((state: stateType) => state.chat);
  // state
  const [search, setSearch] = useState<string>('');

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" pb={2}>
          <Typography variant="h6">Contact Cards</Typography>
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
        }}
      >
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
              height: '450px',
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
                  .filter((contact) => contact.contact.displayName.toLowerCase().includes(search.toLowerCase()))
                  .map((contact) => <ContactCardItem key={contact.contact._id} user={contact.contact} />)
              : contacts.map((contact) => <ContactCardItem key={contact.contact._id} user={contact.contact} />)}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
