'use client';

import dynamic from 'next/dynamic';

const Component = dynamic(
  () => import('@/components/ui/stats-widget').then(m => ({ default: m.Component })),
  { ssr: false, loading: () => <div className="w-full h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" /> }
);

export default function DemoOne() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-20 grayscale brightness-50"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576086213369-97a306dca665?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-background/80 via-background/20 to-background z-10 pointer-events-none" />

      <div className="relative z-20">
        <Component />
      </div>
    </div>
  );
}
