import React, { ReactNode } from 'react';

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
