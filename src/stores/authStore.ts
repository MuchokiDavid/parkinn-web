import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jsonReq } from '@/lib/apiClient';

export type UserRole =  'HOST' | 'OWNER' | 'MANAGER' | 'MOTORIST' | 'ADMIN' | 'GUEST';

export interface User {
  id: number;
  email: string;
  username: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  role: UserRole;
  phone_number: string;
  profile_image?: string | null;
  password?: string;
  current_latitude?: string;
  current_longitude?: string;
  // wallet_account_number?: string;
  wallet_balance?: string;
}

// {
//     "access_token": "d1024868-a32a-488a-993f-bb7323e556ce",
//     "expires_in": 86400,
//     "token_type": "Bearer",
//     "scope": "read write",
//     "refresh_token": "c8deeb8d-236b-412c-9af7-85bd4579cf3d",
//     "user": {
//         "id": 2,
//         "created_at": "2025-11-29T16:41:46.022020+03:00",
//         "updated_at": "2025-11-29T17:36:36.411183+03:00",
//         "last_login": "2025-12-01T18:00:34.987049+03:00",
//         "firstname": "Davido",
//         "middlename": "Muchoki",
//         "lastname": "mwamba",
//         "username": "macharia",
//         "email": "davidmuchoki7@gmail.com",
//         "phone_number": "0705960166",
//         "role": "OWNER",
//         "is_verified": false,
//         "otp": null,
//         "otp_expiration": null,
//         "profile_image": null,
//         "wallet_account_number": "87515537",
//         "wallet_balance": "0.00",
//         "current_latitude": null,
//         "current_longitude": null,
//         "is_staff": false,
//         "is_superuser": false,
//         "is_active": true,
//         "groups": [],
//         "user_permissions": []
//     }
// }

interface AuthState {
  user: User | null;
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (user: User) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updatePassword: (token: string, currentPassword: string, newPassword: string) => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
  logout: () => void;
}

// Mock user database
const MOCK_USERS = {
  'guest@parkbnb.test': {
    password: 'guest123',
    user: { id: '1', email: 'guest@parkbnb.test', name: 'Guest User', role: 'guest' as UserRole }
  },
  'host@parkbnb.test': {
    password: 'host123',
    user: { id: '2', email: 'host@parkbnb.test', name: 'Host User', role: 'host' as UserRole }
  },
  'admin@parkbnb.test': {
    password: 'admin123',
    user: { id: '3', email: 'admin@parkbnb.test', name: 'Admin User', role: 'admin' as UserRole }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      refreshToken: null,
      accessToken: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const res = await jsonReq.post('/login/', { username: email, password });

        set({
          user: res.data.user,
          refreshToken: res.data.refresh_token,
          accessToken: res.data.access_token,
          token: res.data.access_token,
          isAuthenticated: true,
        });
      },
      forgotPassword: async (email: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!MOCK_USERS[email as keyof typeof MOCK_USERS]) {
          throw new Error('User not found');
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!token || !newPassword) {
          throw new Error('Invalid token or password');
        }
      },
      updatePassword: async (token: string, currentPassword: string, newPassword: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!token || !currentPassword || !newPassword) {
          throw new Error('Invalid token or password');
        }
      },
      updateProfile: async (user: User) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        set({ user });
      },
      signup: async (user: User) => {
        try {
          const res = await jsonReq.post('/signup/', user);
          console.log(res);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'parkbnb-auth',
    }
  )
);
