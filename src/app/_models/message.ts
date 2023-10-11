import { User } from "./user";

export class Message {
  connectionId!: string;
  clientuniqueid!: string;
  type!: string;
  message!: string;
  date!: Date;
  user!: User;
  receiver!: string;
  sender!: string;
}
