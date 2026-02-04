const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const resolveMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
};
