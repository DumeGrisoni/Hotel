import { Models } from 'node-appwrite';

export type Menu = Models.Document & {
  title: string;
  price: number;
  dishes: string[];
  descriptions: string[];
};
