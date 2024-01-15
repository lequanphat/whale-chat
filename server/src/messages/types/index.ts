import { ContactType } from 'src/schemas/messages.chema';

export class TextMessageDTO {
  from: string;
  to: string;
  text: string;
}
export class FileUploadDTO {
  from: string;
  to: string;
  text: string;
  file: string;
}
export class SeenMessagesDTO {
  id: string;
  from: string;
  to: string;
}
export class ContactMessageDTO {
  from: string;
  to: string;
  contact: ContactType;
}
