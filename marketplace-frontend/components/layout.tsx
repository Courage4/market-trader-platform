import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
          <Toaster position="top-right" />
        </main>
      </div>
    </div>
  );
}
