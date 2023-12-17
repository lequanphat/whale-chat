import { AlertColor } from '@mui/material';

export interface authType {
    id: string;
    email: string;
    displayName: string;
    avatar: string;
    auth: boolean;
    token: string;
    isLoading: boolean;
}
export interface appType {
    sidebar: {
        open: boolean;
        type: string;
    };
    snackbar: {
        open: boolean;
        message: string;
        serverity: AlertColor;
    };
}
export interface stateType {
    app: appType;
    auth: authType;
}
