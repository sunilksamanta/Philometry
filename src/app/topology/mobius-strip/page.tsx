'use client';

import PageHeader from '@/components/PageHeader';
import { MobiusStripViz } from './MobiusStripViz';

export default function MobiusPage() {
  return (
    <div>
      <PageHeader 
        title="Möbius Strip"
        description="Explore non-orientable surfaces and the concept of infinity through this one-sided mathematical wonder."
        group="Topology & Dimensions"
        category="Non-orientable Surfaces"
        difficulty="Intermediate"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MobiusStripViz />
      </div>
    </div>
  );
}