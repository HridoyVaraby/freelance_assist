import React from 'react';
import { Calendar, Globe2, Server } from 'lucide-react';
import { Project } from '../types';

interface RenewalItem {
  id: string;
  projectName: string;
  type: 'domain' | 'hosting';
  date: string;
  provider: string;
  daysLeft: number;
}

interface UpcomingRenewalsProps {
  projects: Project[];
}

export function UpcomingRenewals({ projects }: UpcomingRenewalsProps) {
  const renewals: RenewalItem[] = projects.flatMap((project) => [
    {
      id: `${project.id}-domain`,
      projectName: project.name,
      type: 'domain',
      date: project.domain.renewalDate,
      provider: project.domain.provider,
      daysLeft: Math.ceil(
        (new Date(project.domain.renewalDate).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      ),
    },
    {
      id: `${project.id}-hosting`,
      projectName: project.name,
      type: 'hosting',
      date: project.hosting.renewalDate,
      provider: project.hosting.provider,
      daysLeft: Math.ceil(
        (new Date(project.hosting.renewalDate).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      ),
    },
  ]).sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Renewals</h2>
      </div>

      <div className="space-y-4">
        {renewals.map((renewal) => (
          <div
            key={renewal.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              {renewal.type === 'domain' ? (
                <Globe2 className="w-5 h-5 text-indigo-600" />
              ) : (
                <Server className="w-5 h-5 text-emerald-600" />
              )}
              <div>
                <h3 className="font-medium text-gray-800">{renewal.projectName}</h3>
                <p className="text-sm text-gray-500">
                  {renewal.type === 'domain' ? 'Domain' : 'Hosting'} · {renewal.provider}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                renewal.daysLeft <= 30 ? 'text-red-600' : 'text-green-600'
              }`}>
                {renewal.daysLeft} days left
              </p>
              <p className="text-sm text-gray-500">
                {new Date(renewal.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}