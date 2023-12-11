import { useTheme } from '@emotion/react';
import { Grid, IconButton, Stack, Tab, Tabs, ThemeOptions, Typography } from '@mui/material';
import { GoChevronLeft } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../../store/slices/appSlice';
import { useState } from 'react';
import { Scrollbar } from '../scrollbar/Scrollbar';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../../data';
import { DocMessage, LinkMessage } from '../chat/MessageTypes';

export default function SharedMessages() {
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
                        dispatch(UpdateSidebarType('CONTACT'));
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
            <Scrollbar scrollbar height="calc(100vh - 134px)" p={3}>
                {(() => {
                    switch (value) {
                        case 0:
                            // Media
                            return (
                                <Grid container spacing={1.2}>
                                    {[0, 1, 2, 3, 4, 5, 6].map((value, index) => {
                                        return (
                                            <Grid key={index} item xs={4} p={0}>
                                                <img
                                                    src={faker.image.url()}
                                                    alt={faker.person.fullName()}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            );
                        case 1:
                            // Links
                            return SHARED_LINKS.map((item, index) => {
                                return <LinkMessage key={index} msg={item} />;
                            });
                        case 2:
                            // Docs
                            return SHARED_DOCS.map((item, index) => {
                                return <DocMessage key={index} msg={item} />;
                            });
                        default:
                            return <></>;
                    }
                })()}
            </Scrollbar>
        </Stack>
    );
}
