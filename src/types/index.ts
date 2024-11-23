export interface Project {
  id: string;
  name: string;
  startDate: string;
  completedDate?: string;
  status: 'active' | 'completed';
  revenue: number;
  client: {
    name: string;
    phone: string;
  };
  website: {
    name: string;
    url: string;
  };
  notes: string;
  domain: {
    purchaseDate: string;
    renewalDate: string;
    provider: string;
  };
  hosting: {
    purchaseDate: string;
    renewalDate: string;
    provider: string;
  };
}

export interface ProjectNote {
  adminUrl?: string;
  loginCredentials?: string;
  emailCredentials?: string;
  hostingAccess?: string;
  projectEmails?: string[];
  colorPalette?: string[];
  additionalNotes?: string;
}