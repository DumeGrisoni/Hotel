import { Models } from 'node-appwrite';
import { Booking } from './bookingType';

export type Room = Models.Document & {
  title: string;
  description: string;
  capacity: number;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  size: number;
  type: string;
  price: number;
  rating: number;
  bookings: Booking[];
};
