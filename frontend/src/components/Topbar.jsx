import React, { useState } from 'react';
import { Bell, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';

export default function Topbar({
  title = 'Dashboard',
  subtitle = "Here's your job application overview",
  user = { name: 'Kanhaiya' },
  onLogout,
  onViewProfile,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const displayName = user?.name || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/80 select-none">
     
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>

   
      <div className="flex items-center gap-3 sm:gap-4">
       
        <button
          type="button"
          className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>

     
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
          >
           
            <div className="w-9 h-9 rounded-full bg-[#0B1528] text-white flex items-center justify-center font-semibold text-sm shadow-sm">
              {initial}
            </div>

            <span className="text-sm font-semibold text-slate-800 hidden sm:inline-block">
              {displayName}
            </span>

            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {displayName}
                </p>
              </div>

               <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  if (onViewProfile) onViewProfile();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}