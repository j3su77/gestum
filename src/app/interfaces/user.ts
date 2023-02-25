export interface User {
  name: string;
  email: string;
  password: string;
  role: Role
}

export enum Role {
  Admin = 'admin',
  Executor = 'executor',
  Client = 'client',
}