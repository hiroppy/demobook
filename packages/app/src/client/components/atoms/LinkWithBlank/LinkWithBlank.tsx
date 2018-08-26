import * as React from 'react';

export interface Props {
  url: string;
  className?: string;
  children: React.ReactNode;
}

export const LinkWithBlank = ({ url, className, children }: Props) => (
  <a href={url} target="_blank" className={className} rel="noopener noreferrer">
    {children}
  </a>
);
