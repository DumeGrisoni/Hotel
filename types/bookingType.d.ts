import { Models } from 'node-appwrite';
import { Room } from './roomsTypes';

export type Booking = Models.Document & {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  user_id: string;
  price: number;
  room: Room;
};
