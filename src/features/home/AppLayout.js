import React from 'react';

export default function AppLayout({ children }) {
  return (
    <div className="home-app">
      <div className="page-container">{children}</div>
    </div>
  );
}
