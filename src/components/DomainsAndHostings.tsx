import React, { useState } from 'react';
import { Search, ArrowUpDown, Globe2, Server, ExternalLink, AlertCircle } from 'lucide-react';
import { Project } from '../types';

interface DomainsAndHostingsProps {
  projects: Project[];
}

export function DomainsAndHostings({ projects }: DomainsAndHostingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: 'domain' | 'hosting';
    subKey: 'renewalDate' | 'provider';
    direction: 'asc' | 'desc';
  }>({ key: 'domain', subKey: 'renewalDate', direction: 'asc' });

  const handleSort = (key: 'domain' | 'hosting', subKey: 'renewalDate' | 'provider') => {
    setSortConfig({
      key,
      subKey,
      direction:
        sortConfig.key === key && sortConfig.subKey === subKey && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const getDaysUntilRenewal = (date: string) => {
    return Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    const aValue = a[sortConfig.key][sortConfig.subKey];
    const bValue = b[sortConfig.key][sortConfig.subKey];
    
    if (sortConfig.subKey === 'renewalDate') {
      return (new Date(aValue).getTime() - new Date(bValue).getTime()) * direction;
    }
    return aValue.localeCompare(bValue) * direction;
  });

  const filteredProjects = sortedProjects.filter(project =>
    project.website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.domain.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.hosting.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Domains & Hostings</h1>
          <p className="text-gray-600 mt-2">Manage your domains and hosting services</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by website, domain provider, or hosting provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <button
                    onClick={() => handleSort('domain', 'provider')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    <Globe2 className="w-4 h-4" />
                    Domain Provider
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <button
                    onClick={() => handleSort('domain', 'renewalDate')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Domain Renewal
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <button
                    onClick={() => handleSort('hosting', 'provider')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    <Server className="w-4 h-4" />
                    Hosting Provider
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <button
                    onClick={() => handleSort('hosting', 'renewalDate')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Hosting Renewal
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => {
                const domainDays = getDaysUntilRenewal(project.domain.renewalDate);
                const hostingDays = getDaysUntilRenewal(project.hosting.renewalDate);

                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {project.website.name}
                          </div>
                          <a
                            href={project.website.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            Visit site
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{project.domain.provider}</div>
                      <div className="text-sm text-gray-500">
                        Purchased: {new Date(project.domain.purchaseDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(project.domain.renewalDate).toLocaleDateString()}
                          </div>
                          <div className={`text-sm font-medium ${
                            domainDays <= 30 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {domainDays} days left
                          </div>
                        </div>
                        {domainDays <= 30 && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{project.hosting.provider}</div>
                      <div className="text-sm text-gray-500">
                        Purchased: {new Date(project.hosting.purchaseDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(project.hosting.renewalDate).toLocaleDateString()}
                          </div>
                          <div className={`text-sm font-medium ${
                            hostingDays <= 30 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {hostingDays} days left
                          </div>
                        </div>
                        {hostingDays <= 30 && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}