import { Button, Typography } from '@mui/material';
import AuthContainer from './AuthContainer';

export default function VerifyEmail() {
    return (
        <AuthContainer title="CHECK YOUR EMAIL" >
            <>
                <Typography pb={2.4} fontSize={17} textAlign="justify">
                    Please check your email address associated with your account and then click on the link in the body
                    of the sent email to confirm.
                </Typography>
                <Button href="mailto:" sx={{ float: 'right' }}>
                    OPEN EMAIL
                </Button>
            </>
        </AuthContainer>
    );
}
