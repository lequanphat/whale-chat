import { TextField, Typography } from '@mui/material';

interface AuthInputProps {
    title: string;
    name: string;
    type: string;
    error: string;
    value: string;
    handleBlur: React.FocusEventHandler<HTMLInputElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
export default function AuthInput({
    title,
    name,
    type = 'text',
    error,
    value,
    handleBlur,
    handleChange,
    ...props
}: AuthInputProps) {
    return (
        <>
            <TextField
                variant="outlined"
                fullWidth
                label={title}
                name={name}
                type={type}
                value={value}
                onBlur={handleBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                }}
                {...props}
            />
            <Typography variant="body1" color={'#e74c3c'} fontSize={14} pt={1} pb={2}>
                {error && `*${error}`}
            </Typography>
        </>
    );
}
