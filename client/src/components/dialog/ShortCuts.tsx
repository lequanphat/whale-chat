import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import Transition from './Transition';

interface ShortcutsType {
    key: number;
    title: string;
    combination: string[];
}
const Shortcuts_List: ShortcutsType[] = [
    {
        key: 0,
        title: 'Mark as unread',
        combination: ['Cmd', 'Shift', 'U'],
    },
    {
        key: 1,
        title: 'Mute',
        combination: ['Cmd', 'Shift', 'M'],
    },
    {
        key: 2,
        title: 'Archive Chat',
        combination: ['Cmd', 'Shift', 'E'],
    },
    {
        key: 3,
        title: 'Delete Chat',
        combination: ['Cmd', 'Shift', 'D'],
    },
    {
        key: 4,
        title: 'Pin Chat',
        combination: ['Cmd', 'Shift', 'P'],
    },
    {
        key: 5,
        title: 'Search',
        combination: ['Cmd', 'F'],
    },
    {
        key: 6,
        title: 'Search Chat',
        combination: ['Cmd', 'Shift', 'F'],
    },
    {
        key: 7,
        title: 'Next Chat',
        combination: ['Cmd', 'N'],
    },
    {
        key: 8,
        title: 'Next Step',
        combination: ['Ctrl', 'Tab'],
    },
    {
        key: 9,
        title: 'Previous Step',
        combination: ['Ctrl', 'Shift', 'Tab'],
    },
    {
        key: 10,
        title: 'New Group',
        combination: ['Cmd', 'Shift', 'N'],
    },
    {
        key: 11,
        title: 'Profile & About',
        combination: ['Cmd', 'P'],
    },
    // {
    //     key: 12,
    //     title: 'Increase speed of voice message',
    //     combination: ['Shift', '.'],
    // },
    // {
    //     key: 13,
    //     title: 'Decrease speed of voice message',
    //     combination: ['Shift', ','],
    // },
    {
        key: 14,
        title: 'Settings',
        combination: ['Shift', 'S'],
    },
    {
        key: 15,
        title: 'Emoji Panel',
        combination: ['Cmd', 'E'],
    },
    {
        key: 16,
        title: 'Sticker Panel',
        combination: ['Cmd', 'S'],
    },
];

export default function ShortCuts({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            keepMounted
            sx={{ p: 4 }}
            TransitionComponent={Transition}
        >
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogContent sx={{ mt: 4 }}>
                <Grid container spacing={2.5}>
                    {Shortcuts_List.map((item) => {
                        return (
                            <Grid item xs={6} key={item.key}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ width: '100%' }}
                                >
                                    <Typography variant="body2">{item.title}</Typography>
                                    <Stack direction="row" alignItems="center" spacing={1.4}>
                                        {item.combination.map((button) => {
                                            return (
                                                <Button disabled variant="contained"  sx={{ color: '#212121', padding: '4px 4px' }}>
                                                    {button}
                                                </Button>
                                            );
                                        })}
                                    </Stack>
                                </Stack>
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
