import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationsTable from './components/ApplicationsTable';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { authService, applicationsService } from './services/api';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup'
  const [editingApplication, setEditingApplication] = useState(null);

  // Authentication state (restores session if token exists in localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('jobtrack_token'));
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('jobtrack_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Data state
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    withdrawn: 0,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // 1. Fetch live data from backend when user is authenticated
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [appsData, statsData] = await Promise.all([
        applicationsService.getAll(),
        applicationsService.getStats(),
      ]);

      if (appsData.applications) {
        setApplications(appsData.applications);
      }
      if (statsData.stats) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error('Failed to load application data:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // 2. Authentication Handlers
  const handleLogin = async ({ email, password }) => {
    try {
      setIsSubmitting(true);
      setAuthError('');
      const data = await authService.login({ email, password });

      localStorage.setItem('jobtrack_token', data.token);
      localStorage.setItem('jobtrack_user', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async ({ name, email, password }) => {
    try {
      setIsSubmitting(true);
      setAuthError('');
      await authService.signup({ name, email, password });

      // Automatically log in user right after successful registration
      const loginData = await authService.login({ email, password });
      localStorage.setItem('jobtrack_token', loginData.token);
      localStorage.setItem('jobtrack_user', JSON.stringify(loginData.user));

      setUser(loginData.user);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jobtrack_token');
    localStorage.removeItem('jobtrack_user');
    setIsAuthenticated(false);
    setUser(null);
    setApplications([]);
    setActiveTab('dashboard');
  };

  // 3. Application CRUD Handlers
  const handleCreateApplication = async (formData) => {
    try {
      setIsSubmitting(true);
      await applicationsService.create(formData);
      await loadData();
      setActiveTab('dashboard');
    } catch (err) {
      alert(`Error creating application: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateApplication = async (formData) => {
    try {
      setIsSubmitting(true);
      const appId = editingApplication._id || editingApplication.id;
      await applicationsService.update(appId, formData);
      await loadData();
      setEditingApplication(null);
      setActiveTab('all-applications');
    } catch (err) {
      alert(`Error updating application: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      await applicationsService.delete(id);
      await loadData();
    } catch (err) {
      alert(`Error deleting application: ${err.message}`);
    }
  };

  const handleStartEdit = (app) => {
    setEditingApplication(app);
    setActiveTab('edit-application');
  };

  // 4. Header title & subtitle configuration
  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'add-application':
        return {
          title: 'Add New Application',
          subtitle: 'Fill in the details of the job application',
        };
      case 'edit-application':
        return {
          title: 'Edit Application',
          subtitle: 'Update the details of your application',
        };
      case 'all-applications':
        return {
          title: 'All Applications',
          subtitle: `Showing all ${applications.length} tracked job applications`,
        };
      case 'statistics':
        return {
          title: 'Statistics & Analytics',
          subtitle: 'Overview of your application conversion and progress',
        };
      case 'profile':
        return {
          title: 'My Profile',
          subtitle: 'Manage your personal details and account settings',
        };
      case 'dashboard':
      default:
        return {
          title: 'Dashboard',
          subtitle: "Here's your job application overview",
        };
    }
  };

  // If unauthenticated, render Login or Signup
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <Signup
          onSignup={handleSignup}
          onNavigateToLogin={() => {
            setAuthError('');
            setAuthView('login');
          }}
          isLoading={isSubmitting}
          apiError={authError}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onNavigateToSignup={() => {
          setAuthError('');
          setAuthView('signup');
        }}
        isLoading={isSubmitting}
        apiError={authError}
      />
    );
  }

  const headerInfo = getHeaderInfo();

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab === 'edit-application' ? 'all-applications' : activeTab}
        setActiveTab={(tab) => {
          setEditingApplication(null);
          setActiveTab(tab);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Topbar
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          user={user || { name: 'Kanhaiya' }}
          onLogout={handleLogout}
          onViewProfile={() => setActiveTab('profile')}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium">Loading your applications...</p>
          </div>
        ) : (
          <>
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <Dashboard
                stats={stats}
                applications={applications.slice(0, 6)}
                onViewAll={() => setActiveTab('all-applications')}
                onEdit={handleStartEdit}
                onDelete={handleDeleteApplication}
              />
            )}

            {/* 2. ADD APPLICATION TAB */}
            {activeTab === 'add-application' && (
              <ApplicationForm
                onSubmit={handleCreateApplication}
                onCancel={() => setActiveTab('dashboard')}
                isSubmitting={isSubmitting}
              />
            )}

            {/* 3. EDIT APPLICATION TAB */}
            {activeTab === 'edit-application' && (
              <ApplicationForm
                initialData={editingApplication}
                onSubmit={handleUpdateApplication}
                onCancel={() => {
                  setEditingApplication(null);
                  setActiveTab('all-applications');
                }}
                isSubmitting={isSubmitting}
              />
            )}

            {/* 4. ALL APPLICATIONS TAB */}
            {activeTab === 'all-applications' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <ApplicationsTable
                  applications={applications}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteApplication}
                />
              </div>
            )}

            {/* 5. STATISTICS TAB */}
            {activeTab === 'statistics' && (
              <Statistics
                stats={stats}
                applications={applications}
              />
            )}

            {/* 6. PROFILE TAB */}
            {activeTab === 'profile' && (
              <Profile
                user={user}
                stats={stats}
                onLogout={handleLogout}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}