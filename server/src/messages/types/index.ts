export enum MessageType {
  SYSTEM = 'system',
  TEXT = 'text',
  IMAGE = 'image',
  DOC = 'doc',
  VOICE = 'voice',
  TIMELINE = 'timeline',
}

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
