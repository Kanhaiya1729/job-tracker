import React from 'react';
import { User, Mail, Shield, Calendar, Briefcase, Award, Clock, LogOut } from 'lucide-react';

export default function Profile({
  user = { name: 'Kanhaiya', email: 'user@example.com' },
  stats = {},
  onLogout,
}) {
  const displayName = user?.name || 'Kanhaiya';
  const displayEmail = user?.email || 'kanhaiya@example.com';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Large Navy Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-[#0B1528] text-white flex items-center justify-center font-bold text-3xl shadow-md shrink-0">
          {initial}
        </div>

        {/* User Info & Badge */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {displayName}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{displayEmail}</span>
              </p>
            </div>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60 self-center sm:self-start">
              Active Job Seeker
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              Verified Account
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Member since 2025
            </span>
          </div>
        </div>
      </div>

      {/* 2. Job Hunt Activity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Tracked
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {stats.total || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Interviews
              </p>
              <p className="text-2xl font-bold text-amber-500 mt-0.5">
                {stats.interview || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Offers
              </p>
              <p className="text-2xl font-bold text-emerald-600 mt-0.5">
                {stats.offer || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Account Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium">
              {displayName}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium">
              {displayEmail}
            </div>
          </div>
        </div>

        {/* Danger Zone / Logout */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">Sign Out</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Securely log out of this JobTrack session
            </p>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}