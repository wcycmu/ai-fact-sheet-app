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
      return '';
    }
  };

  return (
    <a
      href={source.web.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 bg-base-300 rounded-md hover:bg-base-100 transition-colors truncate"
      title={source.web.uri}
    >
      <img src={getFaviconUrl(source.web.uri)} alt="favicon" className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm text-content-200 truncate">{source.web.title || source.web.uri}</span>
    </a>
  );
};

export default SourceLink;