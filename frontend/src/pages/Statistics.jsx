import React from 'react';
import StatCard from '../components/StatCard';
import { StatusBadge } from '../components/ApplicationsTable';
import {
  TrendingUp,
  Target,
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  PieChart,
} from 'lucide-react';

// Styling for Job Type badges matching your UI design screenshot
const JOB_TYPE_STYLES = {
  'Full Time': 'bg-blue-50 text-blue-600 border-blue-200/80',
  'Part Time': 'bg-purple-50 text-purple-600 border-purple-200/80',
  'Internship': 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
  'Contract': 'bg-amber-50 text-amber-600 border-amber-200/80',
  'Remote': 'bg-cyan-50 text-cyan-600 border-cyan-200/80',
};

export function JobTypeBadge({ type = 'Full Time' }) {
  const style = JOB_TYPE_STYLES[type] || JOB_TYPE_STYLES['Full Time'];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {type}
    </span>
  );
}

export default function Statistics({ stats = {}, applications = [] }) {
  const total = stats.total || applications.length || 0;
  const applied = stats.applied || 0;
  const interview = stats.interview || 0;
  const offer = stats.offer || 0;
  const rejected = stats.rejected || 0;
  const withdrawn = stats.withdrawn || 0;

  // Conversion calculations
  const interviewRate = total > 0 ? Math.round((interview / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((offer / total) * 100) : 0;
  const activeCount = applied + interview;

  // Calculate Job Type counts from actual applications list
  const jobTypeCounts = applications.reduce((acc, app) => {
    const type = app.jobType || 'Full Time';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const allJobTypes = ['Full Time', 'Part Time', 'Internship', 'Contract', 'Remote'];

  const statCardsData = [
    { id: 'total', title: 'Total Applications', value: total, variant: 'total' },
    { id: 'applied', title: 'Applied', value: applied, variant: 'applied' },
    { id: 'interview', title: 'Interview', value: interview, variant: 'interview' },
    { id: 'offer', title: 'Offer', value: offer, variant: 'offer' },
    { id: 'rejected', title: 'Rejected', value: rejected, variant: 'rejected' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Top 5 Metric Cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCardsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            variant={stat.variant}
          />
        ))}
      </section>

      {/* 2. Key Conversion Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Active Applications Highlight */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active In Progress
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-900">
                {activeCount}
              </span>
              <span className="text-xs text-slate-400">applications</span>
            </div>
          </div>
        </div>

        {/* Interview Rate Highlight */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Interview Rate
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-amber-500">
                {interviewRate}%
              </span>
              <span className="text-xs text-slate-400">conversion</span>
            </div>
          </div>
        </div>

        {/* Offer Rate Highlight */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Offer Rate
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-emerald-600">
                {offerRate}%
              </span>
              <span className="text-xs text-slate-400">success rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Distribution Grids */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Status Distribution
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {total} Total
            </span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Applied', count: applied, color: 'bg-blue-500' },
              { label: 'Interview', count: interview, color: 'bg-amber-500' },
              { label: 'Offer', count: offer, color: 'bg-emerald-500' },
              { label: 'Rejected', count: rejected, color: 'bg-rose-500' },
              { label: 'Withdrawn', count: withdrawn, color: 'bg-slate-400' },
            ].map((item) => {
              const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;

              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <StatusBadge status={item.label} />
                    <span className="text-slate-600 font-semibold">
                      {item.count}{' '}
                      <span className="text-slate-400 font-normal">
                        ({percentage}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Job Type Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Job Type Distribution
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              By Category
            </span>
          </div>

          <div className="space-y-4">
            {allJobTypes.map((type) => {
              const count = jobTypeCounts[type] || 0;
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

              return (
                <div key={type} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <JobTypeBadge type={type} />
                    <span className="text-slate-600 font-semibold">
                      {count}{' '}
                      <span className="text-slate-400 font-normal">
                        ({percentage}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}