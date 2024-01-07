import { useTheme } from '@emotion/react';
import { Grid, IconButton, Stack, Tab, Tabs, ThemeOptions, Typography } from '@mui/material';
import { GoChevronLeft } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { updateContactType } from '../../store/slices/appSlice';

const SharedMessages = ({ currentMessages }) => {
  const dispatch = useDispatch();
  const theme: ThemeOptions = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Stack direction="column" width={320} height="100%">
      {/* Header  */}
      <Stack
        direction="row"
        height={70}
        alignItems="center"
        justifyContent="start"
        spacing={1}
        p={2}
        sx={{
          width: '100%',
          boxShadow: '0px 0px 2px rgba(0,0,0,.25)',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(updateContactType({ type: 'CONTACT' }));
          }}
        >
          <GoChevronLeft size={22} />
        </IconButton>
        <Typography variant="subtitle2">Shared Messages</Typography>
      </Stack>
      {/* Body */}
      <Stack>
        <Tabs sx={{ height: 60, px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
      </Stack>
      <Scrollbar height="calc(100vh - 134px)" p={3}>
        {(() => {
          switch (value) {
            case 0:
              // Media
              return (
                <Grid container spacing={1.2}>
                  {currentMessages
                    .filter((message) => message.type === 'image')
                    .reverse()
                    .map((item, index) => {
                      return (
                        <Grid key={index} item xs={4} p={0}>
                          <img src={item.image} alt={item.from} style={{ objectFit: 'cover' }} />
                        </Grid>
                      );
                    })}
                </Grid>
              );
            case 1:
              // Links
              return <>Links</>;
            case 2:
              // Docs
              return <>Docs</>;
            default:
              return <></>;
          }
        })()}
      </Scrollbar>
    </Stack>
  );
};
export default React.memo(SharedMessages);
