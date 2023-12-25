export interface Message {
    _id: string;
    type: string;
    from: string;
    to: string;
    text?: string;
    doc?: string;
    image?: string;
    voice?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}
