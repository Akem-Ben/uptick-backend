export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isFirstTimeLogin: boolean;
  role: string;
}