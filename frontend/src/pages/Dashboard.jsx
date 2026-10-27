import React from 'react';
import StatCard from '../components/StatCard';
import ApplicationsTable from '../components/ApplicationsTable';

export default function Dashboard({
  stats = {},
  applications = [],
  onAddNew,
  onViewAll,
  onEdit,
  onDelete,
}) {
  // Map backend stats object to our 5 visual cards
  const statCardsData = [
    {
      id: 'total',
      title: 'Total Applications',
      value: stats.total || 0,
      variant: 'total',
    },
    {
      id: 'applied',
      title: 'Applied',
      value: stats.applied || 0,
      variant: 'applied',
    },
    {
      id: 'interview',
      title: 'Interview',
      value: stats.interview || 0,
      variant: 'interview',
    },
    {
      id: 'offer',
      title: 'Offer',
      value: stats.offer || 0,
      variant: 'offer',
    },
    {
      id: 'rejected',
      title: 'Rejected',
      value: stats.rejected || 0,
      variant: 'rejected',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 5 Metric Cards */}
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

      {/* Recent Applications Table */}
      <section>
        <ApplicationsTable
          applications={applications}
          onViewAll={onViewAll}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>
    </div>
  );
}