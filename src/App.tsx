import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Logo } from './components/Logo';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { IssueForm } from './components/IssueForm';
import { UserProfile } from './components/UserProfile';
import { useAuthStore } from './store/auth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header with Logo and Profile */}
          <div className="flex items-center justify-between py-8">
            <Logo className="mx-auto flex-1" />
            {isAuthenticated && (
              <div className="absolute right-4 sm:right-6 lg:right-8">
                <UserProfile />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="py-8">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <div className="flex justify-center">
                      <AuthForm />
                    </div>
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <PrivateRoute>
                    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
                      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                        Report an Issue
                      </h2>
                      <IssueForm />
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;