import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export function UserProfile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    mobile: user?.mobile || '',
    address: user?.address || '',
  });

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center rounded-full bg-white p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <UserCircle className="h-8 w-8 text-gray-600" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="truncate text-sm text-gray-500">{user.email}</p>
          <div className="mt-2 text-sm text-gray-500">
            <p>Role: {user.role}</p>
            <p>Department: {user.department}</p>
            <p>ID: {user.idNumber}</p>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="border-t border-gray-200">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  active ? 'bg-gray-100' : ''
                }`}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}