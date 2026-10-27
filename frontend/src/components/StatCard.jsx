import React from 'react';
import {
  Briefcase,
  Send,
  CalendarCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const CARD_VARIANTS = {
  total: {
    border: 'border-blue-200/80 hover:border-blue-300',
    numberColor: 'text-blue-600',
    iconBg: 'bg-blue-50 text-blue-600',
    defaultIcon: Briefcase,
  },
  applied: {
    border: 'border-sky-200/80 hover:border-sky-300',
    numberColor: 'text-slate-800',
    iconBg: 'bg-sky-50 text-sky-600',
    defaultIcon: Send,
  },
  interview: {
    border: 'border-amber-200/80 hover:border-amber-300',
    numberColor: 'text-amber-500',
    iconBg: 'bg-amber-50 text-amber-600',
    defaultIcon: CalendarCheck,
  },
  offer: {
    border: 'border-emerald-200/80 hover:border-emerald-300',
    numberColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50 text-emerald-600',
    defaultIcon: CheckCircle2,
  },
  rejected: {
    border: 'border-rose-200/80 hover:border-rose-300',
    numberColor: 'text-rose-500',
    iconBg: 'bg-rose-50 text-rose-600',
    defaultIcon: XCircle,
  },
};

export default function StatCard({
  title,
  value = 0,
  variant = 'total',
  icon: CustomIcon,
}) {
  const config = CARD_VARIANTS[variant.toLowerCase()] || CARD_VARIANTS.total;
  const IconComponent = CustomIcon || config.defaultIcon;

  return (
    <div
      className={`bg-white rounded-2xl p-5 border shadow-xs transition-all duration-200 hover:shadow-md ${config.border}`}
    >
      <p className="text-xs font-medium text-slate-500 mb-3 truncate">
        {title}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`text-3xl font-extrabold tracking-tight ${config.numberColor}`}
        >
          {value}
        </span>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.iconBg}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}