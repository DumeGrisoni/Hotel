export type User =
  | {
      id: string;
      name: string;
      email: string;
      labels: string[];
    }
  | undefined;
