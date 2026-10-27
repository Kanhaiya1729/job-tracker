import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const JOB_TYPES = [
  'Full Time',
  'Part Time',
  'Internship',
  'Contract',
  'Remote',
];

const STATUS_OPTIONS = [
  'Applied',
  'Interview',
  'Rejected',
  'Offer',
  'Withdrawn',
];

export default function ApplicationForm({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const isEditMode = Boolean(initialData && (initialData._id || initialData.id));

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    jobType: 'Full Time',
    location: '',
    appliedDate: new Date().toISOString().split('T')[0],
    salary: '',
    jobUrl: '',
    status: 'Applied',
    notes: '',
  });

  const [error, setError] = useState('');

  // If editing, populate with existing data
  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        position: initialData.position || '',
        jobType: initialData.jobType || 'Full Time',
        location: initialData.location || '',
        appliedDate: initialData.appliedDate
          ? new Date(initialData.appliedDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        salary: initialData.salary || '',
        jobUrl: initialData.jobUrl || '',
        status: initialData.status || 'Applied',
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation for required fields
    if (!formData.company.trim() || !formData.position.trim()) {
      setError('Company and Position are required.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 animate-in fade-in duration-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl text-xs font-semibold text-rose-600">
            {error}
          </div>
        )}

        {/* 2-Column Responsive Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Company <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. TCS"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Position <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Job Type
            </label>
            <div className="relative">
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
              >
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Noida, Remote"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Applied Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Salary
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 6 LPA - 10 LPA"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Job URL
            </label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Status <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Full-Width Notes with Character Counter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Notes
          </label>
          <div className="relative">
            <textarea
              name="notes"
              rows={4}
              maxLength={500}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes..."
              className="w-full px-4 py-3 pb-8 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400 resize-none"
            />
            {/* Character counter (0/500) */}
            <span className="absolute right-3.5 bottom-3 text-xs font-medium text-slate-400 pointer-events-none select-none">
              {formData.notes.length}/500
            </span>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#0B1528] hover:bg-slate-800 text-white font-medium text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting
              ? 'Saving...'
              : isEditMode
              ? 'Update Application'
              : 'Save Application'}
          </button>
        </div>
      </form>
    </div>
  );
}