'use client';

import PageHeader from '@/components/PageHeader';
import { KochSnowflakeTeacher } from './KochSnowflakeTeacher';

export default function KochSnowflakePage() {
  return (
    <div>
      <PageHeader 
        title="Koch Snowflake"
        description="Discover how simple recursive rules create complex geometric patterns with infinite perimeter but finite area."
        group="Recursion"
        category="Mathematical Patterns"
        difficulty="Intermediate"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KochSnowflakeTeacher />
      </div>
    </div>
  );
}