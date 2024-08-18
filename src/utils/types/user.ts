export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  password: string;
  desa: string;
}

export interface User {
  username: string;
  desa: string;
  password?: string;
}
