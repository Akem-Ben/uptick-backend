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


export enum UserRoles {
    User = "User",
    Admin = "Admin"
}