import React from 'react';
import {
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  Layers,
  BarChart3,
  User,
  LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'add-application', label: 'Add Application', icon: PlusCircle },
  { id: 'all-applications', label: 'All Applications', icon: Layers },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
];

const BOTTOM_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'logout', label: 'Logout', icon: LogOut },
];

export default function Sidebar({ activeTab = 'dashboard', setActiveTab, onLogout }) {
  return (
    <aside className="w-64 bg-[#0B1528] text-slate-300 min-h-screen flex flex-col justify-between p-5 border-r border-slate-800/80 select-none shrink-0">
    
      <div>
      
        <div className="flex items-center gap-3 px-3 py-4 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            JobTrack
          </span>
        </div>

     
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

   
      {/* Bottom Section: Profile & Logout */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1.5">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const isLogout = item.id === 'logout';
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (isLogout && onLogout) {
                  onLogout();
                } else if (setActiveTab) {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer ${
                isLogout
                  ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                  : isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}