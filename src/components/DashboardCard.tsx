import React from 'react';
import { Calendar, Globe, Users, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface DashboardCardProps {
  project: Project;
  onClick: (id: string) => void;
}

export function DashboardCard({ project, onClick }: DashboardCardProps) {
  const daysUntilRenewal = Math.ceil(
    (new Date(project.domain.renewalDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  return (
    <div
      onClick={() => onClick(project.id)}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
          <p className="text-gray-500 flex items-center mt-1">
            <Globe className="w-4 h-4 mr-1" />
            {project.website.name}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          project.status === 'completed'
            ? 'bg-green-50 text-green-700'
            : 'bg-blue-50 text-blue-700'
        }`}>
          ${project.revenue.toLocaleString()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{project.client.name}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {project.status === 'completed' ? (
            <span className="text-sm flex items-center">
              Completed {new Date(project.completedDate!).toLocaleDateString()}
              <CheckCircle className="w-4 h-4 ml-2 text-green-600" />
            </span>
          ) : (
            <span className="text-sm">Started {new Date(project.startDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {project.status === 'active' && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Domain Renewal</span>
            <span className={`text-sm font-medium ${
              daysUntilRenewal <= 30 ? 'text-red-600' : 'text-green-600'
            }`}>
              {daysUntilRenewal} days left
            </span>
          </div>
        </div>
      )}
    </div>
  );
}