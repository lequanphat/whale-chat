import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor:
    theme.palette.mode === 'light' ? alpha(theme.palette.background.paper, 1) : theme.palette.background.default,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: 40,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: 'absolute',
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  position: 'absolute',
  color: 'inherit',
  padding: theme.spacing(1, 1, 1, 5),
  width: '100%',
  height: 40,
}));

export { Search, SearchIconWrapper, StyledInputBase };
