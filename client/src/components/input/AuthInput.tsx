import { IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';
interface AuthInputProps {
    title: string;
    name: string;
    error: string;
    value: string;
    password?: boolean;
    handleBlur: React.FocusEventHandler<HTMLInputElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
export default function AuthInput({
    title,
    name,
    error,
    value,
    password,
    handleBlur,
    handleChange,
    ...props
}: AuthInputProps) {
    const [hidden, setHidden] = useState(true);
    return (
        <>
            <TextField
                variant="outlined"
                fullWidth
                label={title}
                name={name}
                type={hidden && password ? 'password' : 'text'}
                value={value}
                onBlur={handleBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                }}
                {...props}
                InputProps={{
                    endAdornment:
                        password &&
                        (hidden ? (
                            <IconButton
                                onClick={() => {
                                    setHidden(false);
                                }}
                            >
                                <IoEyeOutline size={20} />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setHidden(true);
                                }}
                            >
                                <IoEyeOffOutline size={20} />
                            </IconButton>
                        )),
                }}
            />
            <Typography variant="body1" color={'#e74c3c'} fontSize={14} pt={1} pb={2}>
                {error && `*${error}`}
            </Typography>
        </>
    );
}
