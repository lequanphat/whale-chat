import { Badge, Box, IconButton, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';

export const SidebarItem = ({ icon, index, action, badgeContent }) => {
  const theme = useTheme();
  const { sidebar } = useSelector((state: stateType) => state.app);
  return (
    <Box key={index} sx={{ bgcolor: index === sidebar.index && theme.palette.primary.main, borderRadius: 1.5 }}>
      <IconButton
        sx={{
          width: 'max-content',
          color: index === sidebar.index ? '#fff' : theme.palette.text.primary,
        }}
        onClick={() => {
          action(index);
        }}
      >
        <Badge badgeContent={badgeContent} max={5} color="primary">
          {icon}
        </Badge>
      </IconButton>
    </Box>
  );
};
