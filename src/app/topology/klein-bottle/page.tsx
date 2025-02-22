'use client';

import PageHeader from '@/components/PageHeader';
import { KleinBottleViz } from './KleinBottleViz';

export default function KleinBottlePage() {
  return (
    <div>
      <PageHeader 
        title="Klein Bottle"
        description="Visualize a 4D object that has no inside or outside, challenging our perception of boundaries."
        group="Topology & Dimensions"
        category="4D Mathematics"
        difficulty="Advanced"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KleinBottleViz />
      </div>
    </div>
  );
}