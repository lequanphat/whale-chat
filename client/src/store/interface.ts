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
}
export interface stateType {
    app: appType;
    auth: authType;
}
