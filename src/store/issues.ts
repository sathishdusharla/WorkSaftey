import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IssueStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';
export type IssuePriority = 'high' | 'medium' | 'low';

export interface Issue {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  department: string;
  idNumber: string;
  type: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

// Dummy data
const dummyIssues: Issue[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userRole: 'student',
    department: 'Computer Science',
    idNumber: 'CS2024001',
    type: 'Infrastructure',
    description: 'The projector in Room 301 is not working properly. The image is very dim and makes it difficult to follow presentations.',
    priority: 'high',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    userRole: 'employee',
    department: 'Human Resources',
    idNumber: 'HR2024001',
    type: 'IT',
    description: 'Need access to the HR management system. Current credentials are not working.',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2024-03-14T15:20:00Z',
    updatedAt: '2024-03-15T09:00:00Z'
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    userRole: 'student',
    department: 'Computer Science',
    idNumber: 'CS2024001',
    type: 'Academic',
    description: 'Request for extension on project submission due to technical difficulties.',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-03-13T11:45:00Z',
    updatedAt: '2024-03-14T16:30:00Z'
  },
  {
    id: '4',
    userId: '2',
    userName: 'Jane Smith',
    userRole: 'employee',
    department: 'Human Resources',
    idNumber: 'HR2024001',
    type: 'Maintenance',
    description: 'Air conditioning in the HR office needs maintenance. Temperature regulation is not working.',
    priority: 'low',
    status: 'pending',
    createdAt: '2024-03-15T08:15:00Z',
    updatedAt: '2024-03-15T08:15:00Z'
  }
];

interface IssueState {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateIssueStatus: (id: string, status: IssueStatus) => void;
  getIssuesByUser: (userId: string) => Issue[];
  getIssuesByDepartment: (department: string) => Issue[];
}

export const useIssueStore = create<IssueState>()(
  persist(
    (set, get) => ({
      issues: dummyIssues,
      addIssue: (issueData) => {
        const newIssue: Issue = {
          ...issueData,
          id: crypto.randomUUID(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ issues: [...state.issues, newIssue] }));
      },
      updateIssueStatus: (id, status) => {
        set((state) => ({
          issues: state.issues.map((issue) =>
            issue.id === id
              ? { ...issue, status, updatedAt: new Date().toISOString() }
              : issue
          ),
        }));
      },
      getIssuesByUser: (userId) => {
        return get().issues.filter((issue) => issue.userId === userId);
      },
      getIssuesByDepartment: (department) => {
        return get().issues.filter((issue) => issue.department === department);
      },
    }),
    {
      name: 'issues-storage',
    }
  )
);