export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: Role
}

export enum Role {
  Admin = 'admin',
  Executor = 'executor',
  Client = 'client',
}