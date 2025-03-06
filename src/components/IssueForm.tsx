import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useIssueStore, IssuePriority } from '../store/issues';

const studentIssueTypes = [
  'Infrastructure',
  'Harassment',
  'Health & Safety',
  'Academic',
  'Other',
];

const employeeIssueTypes = [
  'HR',
  'IT',
  'Maintenance',
  'Health & Safety',
  'Other',
];

export function IssueForm() {
  const user = useAuthStore((state) => state.user);
  const addIssue = useIssueStore((state) => state.addIssue);

  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const issueTypes = user?.role === 'student' ? studentIssueTypes : employeeIssueTypes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addIssue({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      department: user.department,
      idNumber: user.idNumber,
      type,
      description,
      priority,
      attachments,
    });

    setSuccess(true);
    setType('');
    setDescription('');
    setPriority('medium');
    setAttachments([]);

    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
          Issue reported successfully!
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Issue Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Select type</option>
            {issueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <div className="mt-2 space-x-4">
            {(['high', 'medium', 'low'] as const).map((p) => (
              <label key={p} className="inline-flex items-center">
                <input
                  type="radio"
                  value={p}
                  checked={priority === p}
                  onChange={(e) => setPriority(e.target.value as IssuePriority)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{p}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Submit Issue
      </button>
    </form>
  );
}