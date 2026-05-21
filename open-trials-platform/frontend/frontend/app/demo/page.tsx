'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const IncidentFunnelReportCard = dynamic(
  () => import('../../components/ui/layered-chart-xl'),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" /> }
);

export default function IncidentFunnelReportCardDemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Optional: Set initial dark mode based on system preference
  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300 pt-32">
      <div className="max-w-7xl mx-auto space-y-8 flex flex-col items-center">
        <h1 className="text-4xl font-normal tracking-tight">Component Gallery</h1>
        <button 
            onClick={toggleDarkMode} 
            aria-pressed={isDarkMode}
            className="px-6 py-3 bg-action-blue text-white rounded-full hover:opacity-90 transition-all font-medium"
        >
            Toggle Dark Mode ({isDarkMode ? 'On' : 'Off'})
        </button>
        <div className="w-[600px] h-[714px]">
            <IncidentFunnelReportCard />
        </div>
      </div>
    </div>
  );
}
