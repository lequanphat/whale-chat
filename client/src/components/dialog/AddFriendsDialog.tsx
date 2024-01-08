import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Transition from './Transition';
import { IoCloseOutline } from 'react-icons/io5';
import { Search, SearchIconWrapper, StyledInputBase } from '../input/SearchInput';
import { CiSearch } from 'react-icons/ci';
import { FriendItem } from './FriendItem';

export function AddFriendsDialog({ open, handleClose }) {
  const theme = useTheme();
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
          <Typography variant="h6">Add Friends</Typography>
          <IconButton onClick={handleClose}>
            <IoCloseOutline />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Stack sx={{ width: '100%' }} px={3}>
          <Search sx={{ bgcolor: theme.palette.background.paper }}>
            <SearchIconWrapper>
              <CiSearch size={18} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Stack>
        <Box py={2}>
          <Typography px={3} variant="body1" fontSize={15} sx={{ opacity: 0.6 }}>
            Kết quả tìm kiếm
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
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
