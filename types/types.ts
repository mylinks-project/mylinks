export interface User {
    id: string;
    name: string | undefined; 
    username: string | undefined; 
    email: string | undefined; 
    image?: string | undefined;
    emailVerified?: string | undefined;
    createdAt?: string | undefined;
    isOAuth: boolean;
  }
  