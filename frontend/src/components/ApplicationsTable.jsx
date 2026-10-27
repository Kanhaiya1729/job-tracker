import React, { useState } from 'react';
import { ArrowRight, MoreVertical, Edit2, Trash2, ExternalLink } from 'lucide-react';

const STATUS_STYLES = {
  Applied: 'bg-blue-50 text-blue-600 border-blue-200/60',
  Interview: 'bg-amber-50 text-amber-600 border-amber-200/60',
  Rejected: 'bg-rose-50 text-rose-600 border-rose-200/60',
  Offer: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
  Withdrawn: 'bg-slate-100 text-slate-600 border-slate-200',
};

export function StatusBadge({ status = 'Applied' }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Applied;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${style}`}
    >
      {status}
    </span>
  );
}

export default function ApplicationsTable({
  applications = [],
  onViewAll,
  onEdit,
  onDelete,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Card Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Recent Applications
        </h2>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
              <th className="py-3.5 px-6">Company</th>
              <th className="py-3.5 px-6">Position</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Applied Date</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  No job applications found yet.
                </td>
              </tr>
            ) : (
              applications.map((app) => {
                const appId = app._id || app.id;
                const companyInitials = app.company
                  ? app.company.slice(0, 2).toUpperCase()
                  : 'CO';

                return (
                  <tr
                    key={appId}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Company with Avatar */}
                    <td className="py-4 px-6 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                          {companyInitials}
                        </div>
                        <span className="font-semibold">{app.company}</span>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {app.position}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <StatusBadge status={app.status} />
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {app.appliedDate
                        ? new Date(app.appliedDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </td>

                    {/* Action 3-dots Menu */}
                    <td className="py-4 px-6 text-right relative">
                      <button
                        type="button"
                        onClick={(e) => toggleMenu(appId, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === appId && (
                        <div className="absolute right-6 top-12 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 text-left animate-in fade-in zoom-in-95 duration-100">
                          {onEdit && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onEdit(app);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                              <span>Edit</span>
                            </button>
                          )}
                          {app.jobUrl && (
                            <a
                              href={app.jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                              <span>Job Link</span>
                            </a>
                          )}
                          {onDelete && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onDelete(appId);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}