import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import getFileImage from '../../utils/getFileImage';

export default function MediaPreview({ imageFile, docFile, handleReset }) {
    const theme = useTheme();
    console.log('mediapreview render..');

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            spacing={8}
            sx={{
                top: '-90px',
                left: 0,
                p: '12px 12px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <img
                    src={imageFile ? URL.createObjectURL(imageFile) : getFileImage(docFile.name)}
                    alt="pre-view"
                    style={{ height: '60px' }}
                />
                <Typography
                    variant="body1"
                    maxWidth="200px"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                    {imageFile ? imageFile.name : docFile.name}
                </Typography>
            </Stack>
            <IconButton onClick={handleReset}>
                <IoCloseOutline />
            </IconButton>
        </Stack>
    );
}
