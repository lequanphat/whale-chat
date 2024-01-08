import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Transition from './Transition';
import { IoCloseOutline } from 'react-icons/io5';
import { Search, SearchIconWrapper, StyledInputBase } from '../input/SearchInput';
import { CiSearch } from 'react-icons/ci';
import { FriendItem } from './FriendItem';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from './types';
import Loading from '../loading/Loading';
import { getRecommendedUsersForAddFriends, searchUsersForAddFriend } from '../../store/slices/relationshipSlice';
import useDebounce from '../../hooks/useDebounce';

export function AddFriendsDialog({ open, handleClose }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const theme = useTheme();

  // state
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearchText = useDebounce(search, 500);


  useEffect(() => {
    (async () => {
      if (debouncedSearchText) {
        setIsLoading(true);
        const response = await dispatch(searchUsersForAddFriend(debouncedSearchText));
        setIsLoading(false);
        if (!response.error) {
          setUsers(response.payload);
          console.log(response.payload);
        }
        return;
      }
      setIsLoading(true);
      const result = await dispatch(getRecommendedUsersForAddFriends());
      if (!result.error) {
        setUsers(result.payload);
        console.log(result.payload);
      }
      setIsLoading(false);
    })();
  }, [debouncedSearchText, dispatch]);

  // handle

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
          <Typography variant="h6">Add Friends</Typography>
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
            {search ? 'Kết quả tìm kiếm' : 'Gợi ý kết bạn'}
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
            {isLoading ? <Loading /> : users.map((user) => <FriendItem key={user._id} user={user} />)}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
