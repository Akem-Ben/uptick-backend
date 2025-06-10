export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user'
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
  isActive: boolean;
  isBlocked: boolean;
  verifiedAt: Date;
}