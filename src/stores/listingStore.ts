import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jsonReq } from '@/lib/apiClient';

export type UserRole = 'guest' | 'host' | 'admin' | 'OWNER' | 'MANAGER' | 'MOTORIST' | 'ADMIN' | 'GUEST';


