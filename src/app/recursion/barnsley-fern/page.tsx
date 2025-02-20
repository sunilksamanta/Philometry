'use client';

import PageHeader from '@/components/PageHeader';
import { RecursiveFernTeacher } from './RecursiveFernTeacher';

export default function BarnsleyFernPage() {
  return (
    <div>
      <PageHeader 
        title="Barnsley Fern"
        description="Explore how simple recursive rules create complex natural patterns through the famous Barnsley Fern visualization."
        group="Recursion"
        category="Natural Patterns"
        difficulty="Intermediate"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecursiveFernTeacher />
      </div>
    </div>
  );
}