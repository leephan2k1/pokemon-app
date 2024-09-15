import { User } from '../models/user';

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}
