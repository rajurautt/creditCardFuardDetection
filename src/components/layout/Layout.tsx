
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Fraud Buster AI - College Project</p>
      </footer>
    </div>
  );
};

export default Layout;
