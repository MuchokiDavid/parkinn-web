import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'guest' | 'host' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
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
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
        if (!mockUser || mockUser.password !== password) {
          throw new Error('Invalid email or password');
        }

        const token = `mock_token_${mockUser.user.id}_${Date.now()}`;
        set({
          user: mockUser.user,
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'parkbnb-auth',
    }
  )
);
