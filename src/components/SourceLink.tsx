import React from 'react';
import type { GroundingSource } from '../types';

interface SourceLinkProps {
  source: GroundingSource;
}

const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
  if (!source?.web?.uri) {
    return null;
  }
  
  const getFaviconUrl = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=16`;
    } catch (e) {
      // Return a generic icon if the URL is invalid
      return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM12.91 4a9.266 9.266 0 0 1-.64 1.539 6.7 6.7 0 0 1-.597.933A7.026 7.026 0 0 0 13.745 4h-1.835zm.718 3.5c-.03.877-.138 1.718-.312 2.5h2.49a6.959 6.959 0 0 0 .656-2.5h-2.834zM8.5 1.077V4H10.855a7.967 7.967 0 0 0-1.887-1.855A7.97 7.97 0 0 0 8.5 1.077zm3.567 1.487C13.062 3.443 14.002 4.945 14.48 6.5H11.5V2.564zM1.52 6.5C2.002 4.945 2.94 3.443 3.933 2.564V6.5H1.52zM8.5 14.923V12h-2.355a7.967 7.967 0 0 0 1.887 1.855A7.97 7.97 0 0 0 8.5 14.923zm-4.433-1.487C3.002 12.557 2 11.055 1.52 9.5H4.5v3.436zM11.5 12.436V9.5h2.98c-.478 1.555-1.418 3.057-2.41 3.936zM10.855 12H8.5v2.923a7.967 7.967 0 0 0 1.887-1.855A7.97 7.97 0 0 0 10.855 12zM5.145 12H7.5v2.923a7.967 7.967 0 0 0-1.887-1.855A7.97 7.97 0 0 0 5.145 12zm.692-2.5c.032.877.137 1.718.312 2.5H1.674a6.958 6.958 0 0 1 .656-2.5h2.49zM11.153 9.5c-.032-.877-.137-1.718-.312-2.5h2.834a6.959 6.959 0 0 1-.656 2.5h-2.49z"/></svg>';
    }
  };

  return (
    <a
      href={source.web.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="source-link flex items-center gap-3 p-3 bg-base-100 rounded-lg hover:bg-base-300 transition-colors truncate"
      title={source.web.uri}
    >
      <img src={getFaviconUrl(source.web.uri)} alt="favicon" className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm text-content-200 truncate">{source.web.title || source.web.uri}</span>
    </a>
  );
};

export default SourceLink;