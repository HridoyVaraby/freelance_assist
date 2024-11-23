import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardCard } from './components/DashboardCard';
import { ProjectNotes } from './components/ProjectNotes';
import { UpcomingRenewals } from './components/UpcomingRenewals';
import { ProjectsTable } from './components/ProjectsTable';
import { DomainsAndHostings } from './components/DomainsAndHostings';
import { Settings } from './components/Settings';
import { Project, ProjectNote } from './types';

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Redesign',
    startDate: '2024-01-15',
    status: 'active',
    revenue: 5000,
    client: {
      name: 'Fashion Boutique',
      phone: '+1 (555) 123-4567',
    },
    website: {
      name: 'fashionboutique.com',
      url: 'https://fashionboutique.com',
    },
    notes: '',
    domain: {
      purchaseDate: '2023-01-15',
      renewalDate: '2024-01-15',
      provider: 'GoDaddy',
    },
    hosting: {
      purchaseDate: '2023-01-15',
      renewalDate: '2024-01-15',
      provider: 'DigitalOcean',
    },
  },
  {
    id: '2',
    name: 'Portfolio Website',
    startDate: '2024-02-01',
    status: 'active',
    revenue: 3000,
    client: {
      name: 'John Smith Photography',
      phone: '+1 (555) 987-6543',
    },
    website: {
      name: 'johnsmithphoto.com',
      url: 'https://johnsmithphoto.com',
    },
    notes: '',
    domain: {
      purchaseDate: '2023-02-01',
      renewalDate: '2024-02-01',
      provider: 'Namecheap',
    },
    hosting: {
      purchaseDate: '2023-02-01',
      renewalDate: '2024-02-01',
      provider: 'Netlify',
    },
  },
  {
    id: '3',
    name: 'Restaurant Website',
    startDate: '2023-11-01',
    completedDate: '2024-01-15',
    status: 'completed',
    revenue: 4500,
    client: {
      name: 'Gourmet Kitchen',
      phone: '+1 (555) 456-7890',
    },
    website: {
      name: 'gourmetkitchen.com',
      url: 'https://gourmetkitchen.com',
    },
    notes: '',
    domain: {
      purchaseDate: '2023-11-01',
      renewalDate: '2024-11-01',
      provider: 'GoDaddy',
    },
    hosting: {
      purchaseDate: '2023-11-01',
      renewalDate: '2024-11-01',
      provider: 'DigitalOcean',
    },
  },
];

const sampleNotes: ProjectNote = {
  adminUrl: 'https://admin.fashionboutique.com',
  loginCredentials: 'Username: admin\nPassword: ********',
  emailCredentials: 'Email: admin@fashionboutique.com\nPassword: ********',
  hostingAccess: 'SSH Access: user@server\nPassword: ********',
  projectEmails: ['info@fashionboutique.com', 'support@fashionboutique.com'],
  colorPalette: ['#FF5733', '#33FF57', '#3357FF'],
  additionalNotes: 'Regular maintenance scheduled for the first Monday of each month.',
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeProjects = sampleProjects.filter(p => p.status === 'active');
  const completedProjects = sampleProjects.filter(p => p.status === 'completed');

  const handleProjectClick = (id: string) => {
    const project = sampleProjects.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
      setActiveTab('projects');
    }
  };

  const handleSaveNotes = (notes: ProjectNote) => {
    console.log('Saving notes:', notes);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="ml-64 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
              <p className="text-gray-600 mt-2">Here's an overview of your projects</p>
            </div>
            
            <UpcomingRenewals projects={sampleProjects} />
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProjects.map((project) => (
                  <DashboardCard
                    key={project.id}
                    project={project}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedProjects.map((project) => (
                  <DashboardCard
                    key={project.id}
                    project={project}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            {selectedProject ? (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{selectedProject.name}</h1>
                  <p className="text-gray-600 mt-2">{selectedProject.website.url}</p>
                </div>
                <ProjectNotes
                  notes={sampleNotes}
                  onSave={handleSaveNotes}
                />
              </>
            ) : (
              <ProjectsTable
                projects={sampleProjects}
                onProjectClick={handleProjectClick}
              />
            )}
          </div>
        )}

        {activeTab === 'domains' && (
          <DomainsAndHostings projects={sampleProjects} />
        )}

        {activeTab === 'settings' && (
          <Settings />
        )}
      </main>
    </div>
  );
}

export default App;