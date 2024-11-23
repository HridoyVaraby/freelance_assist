import React, { useState } from 'react';
import { Search, ArrowUpDown, Calendar, DollarSign } from 'lucide-react';
import { Project } from '../types';

interface ProjectsTableProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
}

export function ProjectsTable({ projects, onProjectClick }: ProjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project | 'revenue' | 'clientName';
    direction: 'asc' | 'desc';
  }>({ key: 'startDate', direction: 'desc' });

  const handleSort = (key: typeof sortConfig.key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    switch (sortConfig.key) {
      case 'revenue':
        return (a.revenue - b.revenue) * direction;
      case 'clientName':
        return a.client.name.localeCompare(b.client.name) * direction;
      case 'startDate':
        return (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) * direction;
      default:
        return String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key])) * direction;
    }
  });

  const filteredProjects = sortedProjects.filter(project =>
    Object.values(project).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    project.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.website.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Project
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('clientName')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Client
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('startDate')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <Calendar className="w-4 h-4" />
                  Start Date
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <DollarSign className="w-4 h-4" />
                  Revenue
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {project.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{project.client.name}</div>
                  <div className="text-sm text-gray-500">{project.client.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(project.startDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ${project.revenue.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={project.website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {project.website.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}