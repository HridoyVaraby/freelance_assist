import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ProjectNote } from '../types';

interface ProjectNotesProps {
  notes: ProjectNote;
  onSave: (notes: ProjectNote) => void;
}

export function ProjectNotes({ notes, onSave }: ProjectNotesProps) {
  const [editedNotes, setEditedNotes] = useState<ProjectNote>(notes);

  const handleSave = () => {
    onSave(editedNotes);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Project Notes</h2>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Notes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin URL
            </label>
            <input
              type="text"
              value={editedNotes.adminUrl || ''}
              onChange={(e) => setEditedNotes({ ...editedNotes, adminUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login Credentials
            </label>
            <textarea
              value={editedNotes.loginCredentials || ''}
              onChange={(e) => setEditedNotes({ ...editedNotes, loginCredentials: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Credentials
            </label>
            <textarea
              value={editedNotes.emailCredentials || ''}
              onChange={(e) => setEditedNotes({ ...editedNotes, emailCredentials: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hosting Access
            </label>
            <textarea
              value={editedNotes.hostingAccess || ''}
              onChange={(e) => setEditedNotes({ ...editedNotes, hostingAccess: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Emails
            </label>
            <textarea
              value={editedNotes.projectEmails?.join('\n') || ''}
              onChange={(e) => setEditedNotes({ ...editedNotes, projectEmails: e.target.value.split('\n') })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="One email per line"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Palette
            </label>
            <div className="flex flex-wrap gap-2">
              {editedNotes.colorPalette?.map((color, index) => (
                <input
                  key={index}
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newPalette = [...(editedNotes.colorPalette || [])];
                    newPalette[index] = e.target.value;
                    setEditedNotes({ ...editedNotes, colorPalette: newPalette });
                  }}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
              ))}
              <button
                onClick={() => setEditedNotes({
                  ...editedNotes,
                  colorPalette: [...(editedNotes.colorPalette || []), '#000000']
                })}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          value={editedNotes.additionalNotes || ''}
          onChange={(e) => setEditedNotes({ ...editedNotes, additionalNotes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>
    </div>
  );
}