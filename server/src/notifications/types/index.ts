export class SendNotificationDTO {
  title: string;
  content: string;
  to: string;
}
export class DeleteNotificationDTO {
  user: {
    id: string;
    role: string;
  };
  id: string;
}
