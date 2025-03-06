import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'employee' | 'admin' | 'incharge';
  department: string;
  idNumber: string;
  mobile?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock user data - In a real app, this would come from your backend
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@anurag.edu.in',
    role: 'student',
    department: 'Computer Science',
    idNumber: 'CS2024001',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'faculty@anurag.edu.in',
    role: 'employee',
    department: 'Human Resources',
    idNumber: 'HR2024001',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@anurag.edu.in',
    role: 'admin',
    department: 'Administration',
    idNumber: 'AD2024001',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // In a real app, this would make an API call
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);