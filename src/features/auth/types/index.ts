import { ProfileName } from '@/types/entity';

export interface ILoginInputs {
  username: string;
  password: string;
}
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  profiles: ProfileName[]; // Liste de rôles ou profils
  email_verified_at: string | null;
}

export interface AuthResponse {
  tokens: Tokens;
  userData: UserData;
}
