import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useIssueStore, Issue } from '../store/issues';

function IssueList({ issues }: { issues: Issue[] }) {
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus);

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{issue.type}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Reported by: {issue.userName} ({issue.userRole})
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Department: {issue.department} | ID: {issue.idNumber}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Reported on: {new Date(issue.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                issue.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : issue.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {issue.priority}
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-700">{issue.description}</p>
          <div className="mt-6 flex items-center justify-between">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                issue.status === 'pending'
                  ? 'bg-gray-100 text-gray-800'
                  : issue.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : issue.status === 'resolved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {issue.status}
            </span>
            <select
              value={issue.status}
              onChange={(e) => updateIssueStatus(issue.id, e.target.value as any)}
              className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const getIssuesByUser = useIssueStore((state) => state.getIssuesByUser);
  const getIssuesByDepartment = useIssueStore((state) => state.getIssuesByDepartment);

  if (!user) return null;

  const issues =
    user.role === 'admin' || user.role === 'incharge'
      ? getIssuesByDepartment(user.department)
      : getIssuesByUser(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          {user.role === 'admin' || user.role === 'incharge'
            ? 'Department Issues'
            : 'My Issues'}
        </h2>
        <Link
          to="/report"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusCircle className="h-5 w-5" />
          Report Issue
        </Link>
      </div>
      {issues.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900">No issues found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating a new issue report.
          </p>
          <Link
            to="/report"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusCircle className="h-5 w-5" />
            Report Issue
          </Link>
        </div>
      ) : (
        <IssueList issues={issues} />
      )}
    </div>
  );
}