import { Button, Divider, Stack } from '@mui/material';
import facebook_logo from '../../assets/facebook.png'
import google_logo from '../../assets/google.png'
import github_logo from '../../assets/github.png'
export default function AuthSocial() {
    return (
        <>
            <Divider
                sx={{
                    my: 2.4,
                    typography: 'overline',
                    color: 'text.disabled',
                    '&::before, ::after': {
                        borderTopStyle: 'dashed',
                    },
                }}
            >
                Or
            </Divider>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button  fullWidth variant='outlined' sx={{ padding: '6px 0' }}><img src={google_logo} alt='facebook' style={{ width: 26, height: 26}}/></Button>
                <Button fullWidth variant='outlined' sx={{ padding: '6px 0' }}><img src={facebook_logo} alt='facebook' style={{ width: 26, height: 26 }}/></Button>
                <Button fullWidth variant='outlined' sx={{ padding: '6px 0' }}><img src={github_logo} alt='facebook' style={{ width: 26, height: 26 }}/></Button>
            </Stack>
        </>
    );
}
