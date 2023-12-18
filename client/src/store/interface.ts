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
export interface Contacts {
    _id: string;
    displayName: string;
    email: string;
    avatar: string;
}
export interface contactsType {
    contacts: Contacts[];
    currentContact: number;
    isLoading: boolean;
}
export interface chatType {
    message: string;
    messages: {
        text: string;
        from: string;
        to: string;
    }[];
    recieveMessage: string;
}
export interface stateType {
    app: appType;
    auth: authType;
    contacts: contactsType;
    chat: chatType;
}
